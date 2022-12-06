import $api from "../http"
// import {AxiosResponse} from 'axios';

export default class CategoryService {
    static async fetchCategories(){
        return $api.get('/api/categories');
    }

    static async fetchCategory(id){
        return $api.get(`/api/categories/${id}`);
    }

    static async fetchCategoriesByPost(id){
        return $api.get(`/api/posts/${id}/categories`);
    }
}

