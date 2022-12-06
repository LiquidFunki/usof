import $api from "../http";
// import {AxiosResponse} from 'axios';

export default class CommentService {
  // static async fetchCategories(){
  //     return $api.get('/api/categories');
  // }

  // static async fetchCategory(id){
  //     return $api.get(`/api/categories/${id}`);
  // }

  // static async fetchCategoriesByPost(id){
  //     return $api.get(`/api/posts/${id}/categories`);
  // }

  static async fetchComments(id) {
    return $api.get(`/api/posts/${id}/comments`);
  }

  static async fetchCommentLikes(id) {
    return $api.get(`/api/comments/${id}/like`);
  }

  static async commentLikes(id, type) {
    // console.log("here");
    return $api.post(`/api/comments/${id}/like`, { type });
  }

  static async postCommentLikes(id, type){
    // console.log("here")
    return $api.post(
      `/api/comments/${id}/like`, {type}
    )
  }

  static async deleteLike(id){
    return $api.delete(
      `/api/comments/${id}/like`
    )
  }

  static async uploadComment(id, content){
    return $api.post(
      `/api/posts/${id}/comments`, {content}
    )
  }

  static async deleteComment(id){
    return $api.delete(
      `/api/comments/${id}`
    )
  }

  static async updateComment(id, content, status){
    return $api.patch(
      `/api/comments/${id}`, {content, status}
    )
  }
}
