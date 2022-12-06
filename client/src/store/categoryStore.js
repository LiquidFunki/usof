// import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { API_URL } from "../http";

export default class CategoryStore {
    
    categories = [];
    category = {};
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
        // makeAutoObservable(this, {}, {deep: true});
    }

    setCategory(category){
        this.category = category;
    }

    setCategories(categories){
        this.categories = categories;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    async fetchCategories(){
        this.setLoading(true);
        try{
            const response = await CategoryService.fetchCategories();
            // console.log(response.data);
            // console.log(response.data);
            this.setCategories(response.data);
            // console.log(this.posts);
        } catch(e){
            console.log(e.response?.data?.message);
            // console.log(e);
        } finally{
            this.setLoading(false);
        }
    }

    async fetchCategory(id){
        this.setLoading(true);
        try{
            const response = await CategoryService.fetchCategory(id);
            this.setUser(response.data);
        } catch(e){
            console.log(e.response?.data?.message);
            console.log(e);
        } finally{
            this.setLoading(false);
        }
    }

}
