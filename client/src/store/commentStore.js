import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "../http";

export default class CommentStore {
  comments = [];
  comment = {};
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setComment(comment) {
    this.comment = comment;
  }

  setComments(comments) {
    this.comments = comments;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async fetchComments(id){
    this.setLoading(true);
    try{
        const response = await CommentService.fetchComments(id);
        this.setComments(response.data || []);
    } catch(e){
        console.log(e.response?.data?.message);
        // console.log(e);
    } finally{
        this.setLoading(false); //                                      
    }
  }

  async uploadComment(id, content){
    try{
      const response = await CommentService.uploadComment(id, content);
      this.setComment(response.data);
    } catch(e) {
      console.log(e.response?.data?.message);
      // console.log(e);
    }
  }

  async deleteComment(id){
    try{
      const response = await CommentService.deleteComment(id);
      this.setComment({});
    } catch(e) {
      console.log(e.response?.data?.message);
      // console.log(e);
    }
  }

  async updateComment(id, content, status){
    try{
      console.log(id, content, status);
      const response = await CommentService.updateComment(id, content, status);
      this.setComment(response.data);
    } catch(e) {
      console.log(e.response?.data?.message);
      // console.log(e);
    }
  }

  // async updatePost(id, title, content, categories, status){
  //   try{
  //     console.log(id, title, content, categories, status);
  //     const response = await PostService.updatePost(id, title, content, categories, status);
  //     this.setPost(response.data);
  //   } catch(e) {
  //     console.log(e.response?.data?.message);
  //     // console.log(e);
  //   }
  // }

//   async deletePost(id) {
//     try{
//         const response = await PostService.deletePost(id);
//         this.setPost({});
//     } catch(e) {
//         console.log(e.response?.data?.message);
//         // console.log(e);
//     }
//   }
}
