//data transfer object

module.exports = class UserDto {
    // email;//maybe change for login/full_name
    // id;
    // role;
    // is_active;
    // profile_pic;

    constructor(model) {
        console.log(model);
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.is_active = model.is_active;
        this.login = model.login;
        this.profile_pic = model.profile_pic;
        this.full_name = model.full_name;
    }

    configureForToken(){
        return {email: this.email, id: this.id, role: this.role};
    }
}