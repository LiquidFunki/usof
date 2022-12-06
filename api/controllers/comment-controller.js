const Post = require("../models/Post");
const Comment = require("../models/Comment");
const PostService = require("../service/post-service");
const CommentService = require("../service/comment-service")
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const { json } = require("body-parser");

class CommentController {
    async createComment(req, res, next) {
        try{
            const userData = req.user;
            // console.log(userData);

            const postId = req.params.id;

            const content = req.body.content;
            // console.log(req.body);
            if(!content){
                return next(ApiError.BadRequest('Your comment field is empty'))
            }
            const commentData = await CommentService.createComment(userData.id, content, postId);
            return res.json(commentData);
        } catch(e) {
            next(e);
        }
    }
    async getCommentsByPost(req, res, next){//?????????????
        try{
            let role;//mb make constant so we cant change
            if(req.user){
                const userData = req.user;
                // console.log(userData);
                if(req.user.role == 'admin'){
                    role = 'admin';
                } else {
                    role = 'public';
                }
            } else {
                role = 'public';
            }
            const id = req.params.id;
            
            const comments = await CommentService.getCommentsByPost(id, role);
            return res.json(comments);
        } catch(e) {
            next(e);
        }
    }
    async getOneComment(req, res, next){
        try{
            let role;
            if(req.user){
                const userData = req.user;
                // console.log(userData);
                if(req.user.role == 'admin'){
                    role = 'admin';
                } else {
                    role = 'public';
                }
            } else {
                role = 'public';
            }
            const id = req.params.id;
            const comment = await CommentService.getOneComment(id, role, req.user.id);
            return res.json(comment);
        } catch(e) {
            next(e);
        }
    }

    async deleteOne(req, res, next){
        try{
            const id = req.params.id;
            const comment =  await new Comment({}).findBy('id', id);
            if(!comment) return next(ApiError.BadRequest());

            const userId = req.user.id;
            if (userId != comment.author_id){
                if(req.user.role != 'admin'){
                    return next(ApiError.ForbiddenError());
                }
            }
            const commentData = await CommentService.deleteOne(id);

            return res.json(commentData);
        } catch(e) {
            next(e);
        }
    }

    async updateOne(req, res, next) {
        try{
            const id = req.params.id;
            const comment = await new Comment({}).findBy('id', id);
            if(!comment) return next(ApiError.BadRequest());

            const userId = req.user.id;
            if(userId == comment.author_id){
                const {content, status} = req.body;
                const commentData = await CommentService.updateOneByUser(id, content, status);
                return res.json(commentData);
            } else if(req.user.role == 'admin'){
                const {status} = req.body;
                const commentData = await CommentService.updateOneByAdmin(id, status);
                return res.json(commentData);
            } else {
                return next(ApiError.ForbiddenError)
            }
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new CommentController();