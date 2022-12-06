const User = require("../models/User");
const UserService = require("../service/user-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
    async registration(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {email, password, login, full_name, password_confirmation} = req.body;//full name, password_confirmation
            if(!email || !password || !login || !full_name || !password_confirmation){
                return next(ApiError.BadRequest('Some of your fields are empty'));
            }
            if(password != password_confirmation){
                return next(ApiError.BadRequest('Password not matches with password confirm'));
            }
            const userData = await UserService.registration(email, password, login, full_name);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});//used http so we cant change cookie inside browser

            return res.json(userData);//sending userData + tokens to client
        } catch(e){
            next(e);
        }
    }
    async login(req, res, next){//replae email for login
        try{
            const {email, password, login} = req.body;
            
            const userData = await UserService.login(email, password, login);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});//used http so we cant change cookie inside browser

            return res.json(userData);//sending userData + tokens to client
        } catch(e){
            next(e);
        }
    }
    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e){
            next(e);
        }
    }
    async passwordReset(req, res, next){
        try{
            const {email} = req.body;
            await UserService.passwordReset(email);
            return res.status(200).json("Link sent");
        } catch(e){
            next(e);
        }
    }
    async passwordResetConfirm(req, res, next){
        try{
            const activationLink = req.params.token;
            const {password, password_confirmation} = req.body;//mb add repeat password
            const userData = await UserService.passwordResetConfirm(activationLink, password, password_confirmation);
            return res.status(200).json(userData);
            // return res.redirect(`${process.env.CLIENT_URL}/login`);

        } catch(e) {
            next(e);
        }
    }
    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});//used http so we cant change cookie inside browser

            return res.json(userData);//sending userData + tokens to client
        } catch(e){
            next(e);
        }
    }
    async activateLink(req, res, next){
        try{
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch(e){
            next(e);
        }
    }
    async getUsers(req, res, next){
        try{
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch(e){
            next(e);
        }
    }
    async getOneUser(req, res, next){
        try{
            const id = req.params.id;
            const user = await UserService.getOneUser(id);
            return res.json(user);
        } catch(e){
            next(e);
        }
    }
    async adminRegistration(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error: ', errors.array()));
            }
            const {email, password, login} = req.body;//add full_name and login
            const userData = await UserService.registration(email, password); //check one string up
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);//sending userData + tokens to client
        } catch(e){
            next(e);
        }
    }
    async updateOne(req, res, next){
        try{
            const id = req.params.id;
            const userId = req.user.id;
            if (userId != id){
                if(req.user.role != 'admin'){
                    return next(ApiError.ForbiddenError());
                }
            }
            // const user = {...(req.body.login & req.user.role == "admin" ? {login: req.body.login} : {}), 
            //               ...(req.body.full_name ? {password: req.body.full_name} : {})};
            const {login, full_name} = req.body;
            const user ={login: login, full_name: full_name};
            const userData = await UserService.updateOne(user, id);

            return res.json(userData);

        } catch(e) {
            next(e);
        }
    }
    async deleteOne(req, res, next){
        try{
            const id = req.params.id;
            const userId = req.user.id;
            if (userId != id){
                if(req.user.role != 'admin'){
                    return next(ApiError.ForbiddenError());
                }
            }
            const userData = await UserService.deleteOne(id);
            
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
    async uploadAvatar(req, res, next){// TODO: delete previous avatar
        try{
            console.log("BEBRRBRBSBSABABABABABAA")
            console.log(req.file);
            const imageData = req.file.filename;
            // console.log(imageData);
            const userId = req.user.id;//??????????
            if(!imageData){
                return next(ApiError.BadRequest('Incorrect type of file/No file'));
            }
            const userData = await UserService.uploadAvatar(imageData, userId);

            return res.json(userData);
        } catch(e) {

        }
    }
}

module.exports = new UserController();