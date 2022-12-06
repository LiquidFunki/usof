import AuthService from "../services/AuthService";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { API_URL } from "../http";

export default class AuthStore {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
        // makeAutoObservable(this, {}, {deep: true});
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    async login(email, password, login){
        try{
            console.log(email, password, login);
            const response = await AuthService.login(email, password, login);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        }
    }

    async registation(email, password, login, password_confirmation, full_name){
        try{
            const response = await AuthService.registration(email, password, login, password_confirmation, full_name);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        }
    }

    async logout(){
        try{
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try{
            const response = await axios.get(`${API_URL}/api/auth/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data?.message);
            // console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    async forgetPassword(email){// МБ СДЕЛАТЬ ПРОВЕРКУ НА ПОЧТУ ЮЗЕРА(НУ тип ЧТО ЭТО ТВОЯ ПОЧТА)))
        try{
            const response = await AuthService.forgetPassword(email);
            console.log(response);
        } catch(e) {
            console.log(e.response?.data?.message);
            // console.log(e);
        }
    }

    async resetPassword(password, password_confirmation, token){
        try{
            const response = await AuthService.resetPassword(password, password_confirmation, token);
            console.log(response);
            return response;
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        }

    }
}
