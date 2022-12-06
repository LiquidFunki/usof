const Post = require("../models/Post");
const User = require("../models/User");
const PostCategory = require("../models/PostCategory");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const ApiError = require("../exceptions/api-error");

class LikeService {
    async getLikesByPost(id) {
        const likes = await Like.findAllByEntity('entity_id', id, 'post');
        return {
            likes,
                };
    }

    async getLikesByComment(id){
        const likes = await Like.findAllByEntity('entity_id', id, 'comment');
        // console.log(likes);
        return likes;
    }

    async createLikeComment(author_id, type, comment_id){
        const comment = await new Comment({}).findBy("id", comment_id);
        if(!comment || comment.status === "inactive"){
            throw Error("Comment not found or inactive");
        }
        const likes = await Like.findAllByEntity("entity_id", comment_id, 'comment');

        const user = await new User({}).findBy("id", comment.author_id);

        for(let i = 0; i < likes.length; i++){
            if(likes[i].author_id == author_id){
                if(likes[i].type == "like"){
                    await user.minusRating(comment.author_id);
                } else if(likes[i].type == "dislike"){
                    await user.plusRating(comment.author_id);
                }
                await likes[i].delete("id", likes[i].id);
            }
        }

        if(!user){
            throw Error("User not found");
        }
        if(type == "like" && likes.author_id != user.id){
            await user.plusRating(comment.author_id);
        } else if(type == "dislike" && likes.author_id != user.id){//mb remake for just else
                // if(user.rating > 0){
                    await user.minusRating(comment.author_id);
                // }
        }

        const date = Date.now();
        const newLike = new Like({author_id: author_id, publish_date: date, entity_type: "comment", entity_id: comment_id, type: type});
        await newLike.save();

        const newLikeWithId = await new Like({}).findByEntity("publish_date", date, 'comment');
        // console.log(newLikeWithId);
        return newLikeWithId;

    }

    async createLikePost(author_id, type, post_id){//rating
        const post = await new Post({}).findBy("id", post_id);
        if(!post || post.status === "inactive"){
            throw Error("Post not found or inactive");
        }
        const likes = await Like.findAllByEntity("entity_id", post_id, 'post');
        
        const user = await new User({}).findBy("id", post.author_id);
        
        for(let i = 0; i < likes.length; i++){
            if(likes[i].author_id == author_id){
                if(likes[i].type == "like"){
                    await user.minusRating(post.author_id);
                } else if(likes[i].type == "dislike"){
                    await user.plusRating(post.author_id);
                }
                await likes[i].delete("id", likes[i].id);//add checker
            }
        }
        
        if(!user){
            throw Error("User not found");
        }
        if(type == "like" && likes.author_id != user.id){
            await user.plusRating(post.author_id);
        } else if(type == "dislike" && likes.author_id != user.id){//mb remake for just else
                // if(user.rating > 0){
                    await user.minusRating(post.author_id);
                // }
        }

        const date = Date.now();
        const newLike = new Like({author_id: author_id, publish_date: date, entity_type: "post", entity_id: post_id, type: type});
        await newLike.save();
        const newLikeWithId = await new Like({}).findByEntity("publish_date", date, 'post');
        // console.log(newLikeWithId);
        return newLikeWithId;
    }

    async deleteOne(id, entity, like){//check author id or admin
        // console.log(like);
        let entityObj;
        if(entity == "post"){
            entityObj = await new Post({}).findBy('id', id);
        } else if(entity == "comment"){
            entityObj = await new Comment({}).findBy('id', id);
        }
        // console.log(entityObj);
        
        const user = await new User({}).findBy('id', entityObj.author_id);
        if(like.type == "like"){
            await user.minusRating(entityObj.author_id);
        } else if(like.type == "dislike"){
            await user.plusRating(entityObj.author_id);
        }
        await like.delete("id", like.id);
        return like;
    }
}

module.exports = new LikeService();
