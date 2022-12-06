const { Router } = require("express");
const postController = require("../controllers/post-controller");
const commentController = require("../controllers/comment-controller");
const likeController = require("../controllers/like-controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const publicMiddleware = require('../middlewares/public-middleware');

const router = Router(); //new Router()

router.get('/', publicMiddleware, postController.getAllPosts);//ADD CATEGORIES AND LIKES И СДЕЛАТЬ ТАК, ЧТО Б ЮЗЕР СВОИ ИНАКТИВНЫЕ ПОСТЫ ВИДЕЛ
router.get('/:id', publicMiddleware, postController.getOnePost);
router.get('/:id/comments', publicMiddleware, commentController.getCommentsByPost);
router.post('/:id/comments', authMiddleware, commentController.createComment );
router.get('/:id/categories', publicMiddleware, postController.getCategoriesByPost);
router.get('/:id/like', publicMiddleware, likeController.getLikesByPost);
router.post('/', authMiddleware, body('title').isLength({min: 3, max: 50}), postController.createPost);//required parameters [title, content, categories]     postC
router.post('/:id/like', authMiddleware, likeController.createLikePost);//              likeC
router.patch('/:id', authMiddleware, postController.updateOne);//only creator can update post                  postC
router.delete('/:id', authMiddleware, postController.deleteOne);//                 postC
router.delete('/:id/like', authMiddleware, likeController.deleteOneFromPost);//               likeC

module.exports = router;