import $api from "../http";
// import {AxiosResponse} from 'axios';

export default class PostService {
  static async fetchPosts(filters) {
    // console.log(filters);
    // console.log(`/api/posts/?page=${filters.page}&dateFilter=${filters.dateFilter}&categoriesFilter=${filters.categoriesFilter}&sort=${filters.sort}&userFilter=${filters.userFilter}`)
    return $api.get(
      `/api/posts/?page=${filters.page}&dateFilter=${filters.dateFilter}&categoriesFilter=${filters.categoriesFilter}&sort=${filters.sort}&userFilter=${filters.userFilter}`
    );
  }

  static async fetchUserPosts(id){
    return $api.get(
      `/api/posts/?userFilter=${id}&sort=date,desc`
    );
  }

  static async fetchPost(id){
    return $api.get(
      `/api/posts/${id}`
    )
  }

  static async fetchLikesPost(id){
    return $api.get(
      `/api/posts/${id}/like`
    )
  }

  static async postLikes(id, type){
    console.log("here")
    return $api.post(
      `/api/posts/${id}/like`, {type}
    )
  }

  static async deleteLike(id){
    return $api.delete(
      `/api/posts/${id}/like`
    )
  }

  static async uploadPost(title, content, categories){
    // console.log(title);
    // console.log(content);
    // console.log(categories);
    return $api.post(
      `/api/posts`, {title, content, categories}
    )
  }

  static async deletePost(id){
    return $api.delete(
      `/api/posts/${id}`
    )
  }

  static async updatePost(id, title, categories, content, status) {
    return $api.patch(
      `/api/posts/${id}`, {title, categories, content, status}
    )
  }
}
