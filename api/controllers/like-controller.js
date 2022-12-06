const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const PostService = require("../service/post-service");
const CommentService = require("../service/comment-service");
const LikeService = require("../service/like-service");
const ApiError = require("../exceptions/api-error");
const { json } = require("body-parser");

class LikeController {
    async getLikesByPost(req, res, next){
        try{
            const id = req.params.id;

            const likes = await LikeService.getLikesByPost(id);
            return res.json(likes);
        } catch(e) {
            next(e);
        }
    }

    async getLikesByComment(req, res, next){
        try{
            const id = req.params.id;
            
            const likes = await LikeService.getLikesByComment(id);
            return res.json(likes);
        } catch(e) {
            next(e);
        }
    }

    async createLikePost(req, res, next){
        try{
            const userData = req.user;
            // console.log(userData);

            const postId = req.params.id;

            const type = req.body.type;
            // console.log(type);
            if(!type){
                return next(ApiError.BadRequest('You did not like or dislike'));
            }
            const likeData = await LikeService.createLikePost(userData.id, type, postId);
            return res.json(likeData);
        } catch(e) {
            next(e);
        }
    }

    async createLikeComment(req, res, next){
        try{
            const userData = req.user;
            // console.log(userData);
            console.log(userData);
            console.log(req.params);
            const commentId = req.params.id;

            const type = req.body.type;
            if(!type){
                return next(ApiError.BadRequest('You did not like or dislike'));
            }
            const likeData = await LikeService.createLikeComment(userData.id, type, commentId);
            return res.json(likeData);
        } catch(e) {
            next(e);
        }
    }

    async deleteOneFromPost(req, res, next){
        try{
            const id = req.params.id;
            const post = await new Post({}).findBy('id', id);
            if(!post) return next(ApiError.BadRequest());

            const userId = req.user.id;
            const like = await new Like({}).findByEntityAndAuthor('entity_id', id, 'post', userId);
            if(!like) return next(ApiError.BadRequest());
            // console.log("HFRUEIHFIUOWHFIOUQEWHFIOQUEHFOIQHOIFIUOQFHUIO\n\n\n\n\n")
            // console.log(userId, like);
            if (userId != like.author_id){
                // if (req.user.role != 'admin'){
                    return next(ApiError.ForbiddenError());
                // }
            }
            const likeData = await LikeService.deleteOne(id, "post", like);

            return res.json(likeData);
        } catch(e) {
            next(e);
        }
    }

    async deleteOneFromComment(req, res, next){
        try{
            const id = req.params.id;
            const comment = await new Comment({}).findBy('id', id);
            if(!comment) return next(ApiError.BadRequest());
            
            const userId = req.user.id;
            const like = await new Like({}).findByEntityAndAuthor('entity_id', id, 'comment', userId);
            if(!like) return next(ApiError.BadRequest());
            if (userId != like.author_id){
                return next(ApiError.ForbiddenError());
            }
            const likeData = await LikeService.deleteOne(id, "comment", like);

            return res.json(likeData);
        } catch(e) {
            next(e);
        }
    }

    // async deleteOne(req, res, next){
    //     try{
    //         const id = req.params.id;
    //         const post = await new Post({}).findBy('id', id);
    //         if(!post) return next(ApiError.BadRequest());
            
    //         const userId = req.user.id;
    //         if (userId != post.author_id){
    //             if(req.user.role != 'admin'){
    //                 return next(ApiError.ForbiddenError());
    //             }
    //         }
    //         const postData = await PostService.deleteOne(id);
            
    //         return res.json(postData);
    //     } catch(e) {
    //         next(e);
    //     }
    // }

    // async createComment(req, res, next) {
    //     try{
    //         const userData = req.user;
    //         console.log(userData);

    //         const postId = req.params.id;

    //         const content = req.body.content;
    //         console.log(req.body);
    //         if(!content){
    //             return next(ApiError.BadRequest('Your comment field is empty'))
    //         }
    //         const commentData = await CommentService.createComment(userData.id, content, postId);
    //         return res.json(commentData);
    //     } catch(e) {
    //         next(e);
    //     }
    // }
    // async getCommentsByPost(req, res, next){//?????????????
    //     try{
    //         let role;//mb make constant so we cant change
    //         if(req.user){
    //             const userData = req.user;
    //             console.log(userData);
    //             if(req.user.role == 'admin'){
    //                 role = 'admin';
    //             } else {
    //                 role = 'public';
    //             }
    //         } else {
    //             role = 'public';
    //         }
    //         const id = req.params.id;
            
    //         const comments = await CommentService.getCommentsByPost(id, role);
    //         return res.json(comments);
    //     } catch(e) {
    //         next(e);
    //     }
    // }
}

module.exports = new LikeController();