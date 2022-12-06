const User = require("../models/User"); // maybe make "./models/User"userDto
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dto/user-dto");
const mailService = require("./mail-service");
const uuid = require("uuid");
const ApiError = require("../exceptions/api-error");
const fs = require("fs");
const { info } = require("console");

class UserService {
  async registration(email, password, login, full_name) {
    const newer = { email, password, login, full_name };
    const candidate = await new User({}).isExist(newer.email);

    if (candidate) {
      throw ApiError.BadRequest("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); 
    newer.password = hashPassword;
    // newer.role = "admin"; //admin user maker
    // newer.is_active = 1; //active acc maker
    newer.activation_link = activationLink; //adding fields to user
    const user = new User(newer);
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    ); //send token
    await user.save();

    const newerDto = await new User({}).findBy("email", email);

    const userDto = await new UserDto(newerDto);
    const tokens = tokenService.generateTokens(userDto.configureForToken()); // remake user DTO sending in token, because token becomes tooo long
    console.log(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await new User({}).findBy("activation_link", activationLink);
    console.log("USER in func activate \n");
    console.log(user);
    console.log("\n");
    if (!user) {
      throw ApiError.BadRequest("Incorrect activation link");
    }
    user.is_active = 1;
    await user.save();
  }

  async login(email, password, login) {
    //replace email for login
    // const user = await new User({}).isExist(email);
    const user = await new User({}).findBy("email", email);
    if (!user) {
      throw ApiError.BadRequest("No user with this email"); // replace email for login
    }
    console.log(user);
    // if(!user.is_active){
    //     throw ApiError.UnathorizedError('User is not activated');
    // }
    const isPassEquals = await bcrypt.compare(password, user.password);
    console.log(isPassEquals);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Invalid password");
    }
    const userDto = await new UserDto(user);
    // console.log(userDto);
    const tokens = tokenService.generateTokens(userDto.configureForToken()); // remake user DTO sending in token, because token becomes tooo long
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnathorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findOneToken(refreshToken);

    if (!userData || !tokenFromDb) throw ApiError.UnathorizedError();

    const user = await new User({}).findBy("id", userData.id);
    const userDto = await new UserDto(user);
    // console.log(userDto);
    const tokens = tokenService.generateTokens(userDto.configureForToken()); // remake user DTO sending in token, because token becomes tooo long
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async passwordReset(email) {
    const user = await new User({}).findBy("email", email);
    if (!user) {
      throw ApiError.BadRequest("No user with this email");
    }
    if (!user.is_active) {
      throw ApiError.BadRequest("User is not active");
    }
    const activationLink = uuid.v4(); //use as link/token for email activation/reset
    await mailService.sendPasswordMail(
      email,
      // `${process.env.CLIENT_URL}/api/auth/password-reset/${activationLink}`
      `${process.env.CLIENT_URL}/forgetPassword/${activationLink}`
    ); //make another func
    user.activation_link = activationLink;
    await user.save();
    return user;
  }

  async passwordResetConfirm(activationLink, password, passwordRepeat) {
    const user = await new User({}).findBy("activation_link", activationLink);
    if (!user) {
      throw ApiError.BadRequest("No user found");
    }
    if (password != passwordRepeat) {
      throw ApiError.BadRequest("Password not matches with passwordRepeat");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    user.activation_link = null;
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await User.getAll();
    return users;
  }

  async getOneUser(id) {
    const user = await new User({}).findBy("id", id);
    if (!user) {
      throw ApiError.BadRequest("No user found");
    }
    return user;
  }

  async updateOne(userIncome, id) {
    console.log("HERHEHRHEHREHRHERHERH\n\n\n\n", userIncome)
    const user = await new User({}).findBy("id", id);
    if (!user) {
      throw ApiError.BadRequest("No user found");
    }
    user.full_name = userIncome.full_name;
    
    const replica = await new User({}).findBy("login", userIncome.login);
    if(replica && replica.id != id){
      throw new Error("user with such login already exists");
    } else {
      user.login = userIncome.login;
    }

    await user.save();
    return user;
  }

  async deleteOne(id) {
    const user = await new User({}).findBy("id", id);
    if (!user) {
      throw ApiError.BadRequest("No user found");
    }

    await user.delete("id", id);
    return user;
  }

  async uploadAvatar(imageData, id) {
    const user = await new User({}).findBy("id", id);
    if (!user) {
      throw ApiError.BadRequest("No user found");
    }
    console.log(user.profile_pic);
    if (user.profile_pic && user.profile_pic != "default.png") {
      fs.unlink(`./src/avatars/${user.profile_pic}`, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
    }

    user.profile_pic = imageData;
    await user.save();
    return user;
  }
}

module.exports = new UserService();
