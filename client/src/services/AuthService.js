import $api from "../http"
// import {AxiosResponse} from 'axios';

export default class AuthService {

    static async login(email, password, login) {
        return $api.post('/api/auth/login', {email, password, login})
    }

    static async registration(email, password, login, password_confirmation, full_name) {
        return $api.post('/api/auth/register', {email, password, login, password_confirmation, full_name})
    }

    static async logout() {
        return $api.post('/api/auth/logout')
    }

    static async forgetPassword(email){
        return $api.post('/api/auth/password-reset', {email});
    }
    
    static async resetPassword(password, password_confirmation, token) {
        console.log("HERHHERHERHHERHERHHERHREHH")
        return $api.post(`/api/auth/password-reset/${token}`, {password, password_confirmation})
    }

}
