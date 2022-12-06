const { Router } = require("express");
const postController = require("../controllers/post-controller");
const commentController = require("../controllers/comment-controller");
const likeController = require("../controllers/like-controller");
const categoriesController = require("../controllers/categories-controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const publicMiddleware = require('../middlewares/public-middleware');

const router = Router(); //new Router()

router.get('/:id', publicMiddleware, commentController.getOneComment);//mb public middleware? if im author/ am i allowed to get that comment???
router.get('/:id/like', publicMiddleware, likeController.getLikesByComment);
router.post('/:id/like', authMiddleware, likeController.createLikeComment);
router.patch('/:id', authMiddleware, commentController.updateOne);//CHECK MB FOR ACTIVE/INACTIVE(IN POSTS ALSO)
router.delete('/:id', authMiddleware, commentController.deleteOne);
router.delete('/:id/like', authMiddleware, likeController.deleteOneFromComment);


module.exports = router;