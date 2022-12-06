const Post = require("../models/Post");
const PostService = require("../service/post-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const { json } = require("body-parser");
const { request } = require("express");


class PostController {
    async createPost(req, res, next){
        try{
            const userData = req.user;
            // console.log(userData);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {title, content, categories} = req.body;
            console.log(categories);

            if(!content || !categories){
                return next(ApiError.BadRequest('Some of your fields are empty'));
            }
            const PostData = await PostService.createPost(userData.id, title, content, categories);

            return res.json(PostData);

        } catch(e) {
            next(e);
        }
    }

    async getAllPosts(req, res, next){
        try{
            let role;//mb make constant so we cant change
            if(req.user){
                const userData = req.user;
                // console.log(userData);
                if(req.user.role == 'admin'){
                    role = 'admin';
                } else {
                    role = 'notadmin';
                }
            } else {
                role = 'public';
            }
            
            const offset = (req.page - 1) * 5;//TODO: REPLACE
            // console.log(offset);
            // if(!req.user.id){
            //     const userId = null;
            // }

            const posts = await PostService.getAllPosts(role, offset, req.categoriesFilter, req.userFilter, req.dateFilter, req?.user?.id || null, req.sort);
            return res.json(posts);
        } catch(e) {
            next(e);
        }
    }

    async getOnePost(req, res, next){//!!!!!TODO: IF IS NOT ACTIVE == HIDE!!!!
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
            const post = await PostService.getOnePost(id, role);
            return res.json(post);
        } catch(e) {
            next(e);
        }
    }

    async getCategoriesByPost(req, res, next){//?????????????
        try{
            
            const id = req.params.id;
            
            const posts = await PostService.getCategoriesByPost(id);//mb not posts but categories
            return res.json(posts);
        } catch(e) {
            next(e);
        }
    }

    async deleteOne(req, res, next){
        try{
            const id = req.params.id;
            const post = await new Post({}).findBy('id', id);
            if(!post) return next(ApiError.BadRequest());
            
            const userId = req.user.id;
            if (userId != post.author_id){
                if(req.user.role != 'admin'){
                    return next(ApiError.ForbiddenError());
                }
            }
            const postData = await PostService.deleteOne(id);
            
            return res.json(postData);
        } catch(e) {
            next(e);
        }
    }

    async updateOne(req, res, next){
        try{
            const id = req.params.id;
            console.log(id);
            const post = await new Post({}).findBy('id', id);
            if(!post) return next(ApiError.BadRequest());

            const userId = req.user.id;
            if(userId == post.author_id){//mb 1=/ 2=/ 3=
                const {title, categories, content} = req.body; // В ЭНДПОИНТАХ СКАЗАНО, ЧТО И ТИТУЛКУ МЕНЯТЬ, А В ПРЕД. МОМЕНТЕ ТОК ПРО КОНТЕНТ
                console.log(title, categories, content);
                if(!content || !categories || !title){
                    return next(ApiError.BadRequest('Some of your fields are empty'));
                }
                const postData = await PostService.updateOneByUser(title, categories, content, id);
                return res.json(postData);
            } else if(req.user.role == 'admin'){//mb 1=/ 2=/ 3=
                const {status, categories} = req.body;
                if(!status || !categories){
                    return next(ApiError.BadRequest('Some of your fields are empty'));
                }
                const postData = await PostService.updateOneByAdmin(status, categories, id);
                return res.json(postData);
            } else {
                return next(ApiError.ForbiddenError);
            }
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new PostController();