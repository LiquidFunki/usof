import PostService from "../services/PostService";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "../http";

export default class PostStore {
  initialFilters = {
    page: 1,
    dateFilter: null,
    sort: "date,desc",
    userFilter: null,
    categoriesFilter: null,
  };

  posts = [];
  post = {};
  filters = this.initialFilters;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    // makeAutoObservable(this, {}, {deep: true});
  }

  setPost(post) {
    this.post = post;
  }

  pageIncrement() {
    this.filters.page++;
  }

  pageDecrement() {
    if (this.filters.page === 1) {
      console.log("bebra");
    } else {
      this.filters.page--;
    }
  }

  setPosts(posts) {
    this.posts = posts;
  }

  setFilters(filters) {
    this.filters = filters;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async fetchPosts(filters) {
    this.setLoading(true);
    try {
      // console.log(filters);
      const response = await PostService.fetchPosts(filters);
      // console.log(response.data);
      // console.log(response);
      this.setPosts(response.data || []);
      // console.log(this.posts);
    } catch (e) {
      console.log(e.response?.data?.message);
      // console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async fetchPost(id) {
    this.setLoading(true);
    try {
      const response = await PostService.fetchPost(id);
      this.setPost(response.data || {});
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async uploadPost(title, content, categories) {
    try{
        console.log(title, content, categories);
        const response = await PostService.uploadPost(title, content, categories);
        this.setPost(response.data);
    } catch(e){
        console.log(e.response?.data?.message);
        // console.log(e);
    }
  }

  async deletePost(id) {
    try{
        const response = await PostService.deletePost(id);
        this.setPost({});
    } catch(e) {
        console.log(e.response?.data?.message);
        // console.log(e);
    }
  }

  async updatePost(id, title, content, categories, status){
    try{
      console.log(id, title, content, categories, status);
      const response = await PostService.updatePost(id, title, content, categories, status);
      this.setPost(response.data);
    } catch(e) {
      console.log(e.response?.data?.message);
      // console.log(e);
    }
  }

//   async registation(email, password, login, password_confirmation, full_name) {
//     try {
//       const response = await AuthService.registration(
//         email,
//         password,
//         login,
//         password_confirmation,
//         full_name
//       );
//       console.log(response);
//       localStorage.setItem("token", response.data.accessToken);
//       this.setAuth(true);
//       this.setUser(response.data.user);
//     } catch (e) {
//       console.log(e.response?.data?.message);
//       // console.log(e);
//     }
//   }
}
