const Post = require("../models/Post");
const PostCategory = require("../models/PostCategory");
const Category = require("../models/Category")
const ApiError = require("../exceptions/api-error");
const LikeService = require("../service/like-service");
  

class PostService {

        async createPost(author_id, title, content, categories){// [categories: bebra, bebra2, bebra3]
            let checker;
            for(let i = 0; i < categories.length; i++) {
                checker = await new Category({}).findBy("title", categories[i]);
                if(!checker){
                    throw new ApiError.BadRequest("Incorrect categories selected, dont ruin api");
                }
            }

            // const bebra = {title, content};
            const date = Date.now();
            const post = new Post({author_id: author_id, title: title, content: content, publish_date: date});
            await post.save();
            

            const postWithId = await new Post({}).findBy("publish_date", date);
            // console.log(postWithId);

    
            for(let i = 0; i < categories.length; i++) {
                checker = await new Category({}).findBy("title", categories[i]);
                let newPostCategoryRow = new PostCategory({post_id: postWithId.id, category_id: checker.id});
                await newPostCategoryRow.save();
            }


            return postWithId;
        }

        async getAllPosts(role, offset, categoriesFilter, userFilter, dateFilter, userId, sort) {
            if (role === "admin"){
                const posts = await Post.getAll(offset, categoriesFilter, userFilter, dateFilter, sort);
                // const res = [];
                // for (const post of posts){
                //     const likes = await LikeService.getLikesByPost(post.id);
                //     res.push({...post, likeCounter: likes.length}); 
                // }    
                // return res;
                return posts;
            } else if (role === "notadmin") {
                // const posts = await Post.findAllBy("status", "active", offset);
                const posts = await Post.getAllByNotAdmin(offset, categoriesFilter, userFilter, dateFilter, userId, sort);
                return posts;
            } else {
                const posts = await Post.getAllByNotAdmin(offset, categoriesFilter, userFilter, dateFilter, null, sort);//МОГУ ЛИ Я ТАК ДЕЛАТЬ? И КАК ЛУЧШЕ?
                return posts;
            }
        }


        async getOnePost(id, role) {
            if(role === "admin"){
                const post = await new Post({}).findBy('id', id);
                if(!post) {
                    throw Error('No post found');//how to make return error?
                }
                return post;
            } else {
                const post = await new Post({}).findBy('id', id);
                if(!post) {
                    throw Error('No post found');
                }
                if(post.status === "inactive"){
                    throw Error('Post is inactive');
                }
                return post;
            }
        }

        async getCategoriesByPost(id){
           
            const categories = await PostCategory.findAllBy('post_id', id);
            // console.log(categories);
            const categoriesArr = [];
            let temp;
            for(let i = 0; i < categories.length; i++) {
                temp = await new Category({}).findBy('id', categories[i].category_id);
                // console.log(temp.title);
                categoriesArr.push(temp);
            }
            return categoriesArr;
        }

        async deleteOne(id){
            const post = await new Post({}).findBy('id', id);
            if(!post) {
                throw Error('No post found');
            }

            await post.delete("id", id);
            return post;
        }
       
        async updateOneByUser(title, categories, content, id){// categories["bebra1", "bebra2", "bebra3"]
            console.log(title, categories, content, id);
            const post = await new Post({}).findBy('id', id);
            if(!post) {
                throw ApiError.BadRequest('No post found');
            }
            
            const postCategoryArr = await PostCategory.findAllBy('post_id', id);
            for (let i = 0; i < postCategoryArr.length; i++) {
                // console.log(postCategoryArr[i]);
                await postCategoryArr[i].delete('post_id', id);
            }

            let temp;
            let newPostCategoryRow;
            console.log(categories);
            for(let i = 0; i < categories.length; i++) {
                temp = await new Category({}).findBy('title', categories[i]);
                console.log(categories[i]);
                console.log(id);
                console.log(temp);
                newPostCategoryRow = new PostCategory({post_id: id, category_id: temp.id}); 
                await newPostCategoryRow.save();
            }

            // const date = Date.now();
            // post.publish_date = date;
            
            post.title = title;
            post.content = content;
            await post.update();

            return post;
        }

        async updateOneByAdmin(status, categories, id){
            const post = await new Post({}).findBy('id', id);
            if(!post) {
                throw ApiError.BadRequest('No post found');
            }
            
            const postCategoryArr = await PostCategory.findAllBy('post_id', id);
            for (let i = 0; i < postCategoryArr.length; i++) {
                // console.log(postCategoryArr[i]);
                await postCategoryArr[i].delete('post_id', id);
            }

            let temp;
            let newPostCategoryRow;
            for(let i = 0; i < categories.length; i++) {
                temp = await new Category({}).findBy('title', categories[i]);
                newPostCategoryRow = new PostCategory({post_id: id, category_id: temp.id}); 
                await newPostCategoryRow.save();
            }

            // const date = Date.now();
            // post.publish_date = date;
            if(status){
                post.status = status;
                await post.update();
            }

            return post;
        }
    

}

module.exports = new PostService();