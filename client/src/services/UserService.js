import $api from "../http"
// import {AxiosResponse} from 'axios';

export default class UserService {
    static async fetchUsers(){
        return $api.get('/api/users');
    }

    static async fetchUser(id){
        return $api.get(`/api/users/${id}`);
    }

    static async updateAvatar(filedata){
        // console.log(filedata)
        let formData = new FormData();
        formData.append('filedata', filedata);
        return $api.patch(`/api/users/avatar`, formData)
    }

    static async updateUser(id, login, full_name){
        return $api.patch(`/api/users/${id}`, {login, full_name})
    }
}

