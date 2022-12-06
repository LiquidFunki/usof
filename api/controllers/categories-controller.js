const Post = require("../models/Post");
const PostService = require("../service/post-service");
const Category = require("../models/Category");
const CategoryService = require("../service/category-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const { json } = require("body-parser");

class CategoryController {

    async getAllCategories(req, res, next){
        try{
            const categories = await CategoryService.getAllCategories();
            return res.json(categories);
        } catch(e) {
            next(e);
        }
    }

    async getOneCategory(req, res, next){
        try{
            const id = req.params.id;
            const category = await CategoryService.getOneCategory(id);
            return res.json(category);
        } catch(e) {
            next(e);
        }
    }

    async getPostsByCategory(req, res, next){
        try{
            const id = req.params.id;

            const posts = await CategoryService.getPostsByCategory(id);
            return res.json(posts);
        } catch(e) {
            next(e);
        }
    }

    async createCategory(req, res, next){
        try{
        const userData = req.user;
        const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {title, description} = req.body;
            if(!title){
                return next(ApiError.BadRequest('Title field is empty'));
            }
            const CategoryData = await CategoryService.createCategory(title, description);
            return res.json(CategoryData);
        } catch(e) {
            next(e);
        }
    }
    
    async updateCategory(req, res, next){
        try{
            const id = req.params.id;
            const category = await new Category({}).findBy('id', id);
            if(!category) return next(ApiError.BadRequest());

            // const userId = req.user.id;
            if(req.user.role != 'admin'){
                return next(ApiError.ForbiddenError());
            }
            const {title, description} = req.body;
            const categoryData = await CategoryService.updateCategory(title, description, id);//mb not id -> whole category give
            return res.json(categoryData);
        } catch(e) {
            next(e);
        }
    }

    async deleteCategory(req, res, next) {
        try{
            const id = req.params.id;
            const category = await new Category({}).findBy('id', id);
            if(!category) return next(ApiError.BadRequest());

            const categoryData = await CategoryService.deleteCategory(id);
            return res.json(categoryData);
        } catch(e) {
            next(e);
        }
    }

}

module.exports = new CategoryController();