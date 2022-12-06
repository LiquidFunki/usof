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

router.get('/', publicMiddleware, categoriesController.getAllCategories);
router.get('/:id', publicMiddleware, categoriesController.getOneCategory);
router.get('/:id/posts', publicMiddleware, categoriesController.getPostsByCategory);
router.post('/', body('title').isLength({min: 3, max: 50}), authMiddleware, categoriesController.createCategory);//title, description
router.patch('/:id', body('title').isLength({min: 3, max: 50}), authMiddleware, categoriesController.updateCategory);
router.delete('/:id', adminMiddleware, categoriesController.deleteCategory);//admin only???


module.exports = router;