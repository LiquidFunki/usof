const Post = require("../models/Post");
const PostCategory = require("../models/PostCategory");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const ApiError = require("../exceptions/api-error");

class CategoryService {

    async getAllCategories(){
        const categories = await Category.getAll();
        return categories;
    }

    async getOneCategory(id){
        const category = await new Category({}).findBy("id", id);
        if(!category){
            throw Error("No category found");
        }
        return category;
    }

    async getPostsByCategory(id){
        const posts = await PostCategory.findAllBy('category_id', id);
        // console.log(posts);
        const postsArr = [];
        let temp;
        for(let i = 0; i < posts.length; i++){
            temp = await new Post({}).findBy('id', posts[i].post_id);
            postsArr.push(temp);// not sure
        }
        return postsArr;
    }

    async createCategory(title, description){
        const category = new Category({title: title, description: description});
        await category.save();

        const categoryWithId = await new Category({}).findBy("title", title);
        // console.log(categoryWithId);

        return categoryWithId;
    }

    async updateCategory(title, description, id){
        const category = await new Category({}).findBy('id', id);
        category.title = title;
        category.description = description;

        await category.save();
        return category;
    }

    async deleteCategory(id){
        const category = await new Category({}).findBy('id', id);
        await category.delete("id", id);
        return category;
    }
 
}

module.exports = new CategoryService();
