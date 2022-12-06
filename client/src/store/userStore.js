// import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { API_URL } from "../http";

export default class UserStore {
    users = [];
    user = {};
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
        // makeAutoObservable(this, {}, {deep: true});
    }

    setUser(user){
        this.user = user;
    }

    setUsers(users){
        this.users = users;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    async fetchUsers(){//need any filters here?
        this.setLoading(true);
        try{
            const response = await UserService.fetchUsers();
            // console.log(response.data);
            this.setUsers(response.data);
            // console.log(this.posts);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        } finally{
            this.setLoading(false);
        }
    }

    async fetchUser(id){
        this.setLoading(true);
        try{
            const response = await UserService.fetchUsers(id);
            this.setUser(response.data);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        } finally{
            this.setLoading(false);
        }
    }

    async updateUser(id, login, full_name){
        this.setLoading(true);
        try{
            const response = await UserService.updateUser(id, login, full_name);
            this.setUser(response.data);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        } finally{
            this.setLoading(false);
        }
    }

}
