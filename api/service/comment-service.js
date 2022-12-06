const Post = require("../models/Post");
const PostCategory = require("../models/PostCategory");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const ApiError = require("../exceptions/api-error");

class CommentService {
  async createComment(author_id, content, post_id) {
    // console.log(content)
    const post = await new Post({}).findBy("id", post_id);
    if (!post || post.status == "inactive") {
      throw Error("Post not found or inactive");
    }
    const date = Date.now();
    const comment = new Comment({author_id: author_id, content: content, post_id: post_id, publish_date: date});
    await comment.save();
    const commentWithId = await new Comment({}).findBy("publish_date", date);
    // console.log(commentWithId);
    return commentWithId;// or just delete 2 strings up and return comment
  }
  async getCommentsByPost(id, role){
    if (role === "admin"){
      const comments = await Comment.findAllBy("post_id", id);
      return comments;
    } else {
      const comments = await Comment.findAllByActive("post_id", id);
      return comments;
    }
  }
  async getOneComment(id, role, userId){
    if(role === "admin"){
      const comment  = await new Comment({}).findBy('id', id);
      if(!comment) {
        throw Error('No comment found');
      }
      return comment;
    } else {
      const comment = await new Comment({}).findBy('id', id);
      if(!comment) {
        throw Error('No comment found');
      }
      if(comment.status === "inactive"){
        if(comment.author_id == userId){
          return comment;
        }
        throw Error('Comment is inactive');
      }
      return comment;
    }
  }
  async deleteOne(id){
    const comment  = await new Comment({}).findBy('id', id);
    if(!comment){
      throw Error('No comment found');;
    }

    await comment.delete("id", id);
    return comment;
  }
  async updateOneByUser(id, content, status){
    const comment = await new Comment({}).findBy('id', id);
    if(status){
      comment.status = status;
    }
    comment.content = content;
    await comment.update();

    return comment;
  }
  async updateOneByAdmin(id, status){
    const comment = await new Comment({}).findBy('id', id);
    if(status){
      comment.status = status;
    }
    await comment.update();

    return comment;
  }

}

module.exports = new CommentService();
