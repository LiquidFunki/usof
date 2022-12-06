const User = require('../models/user');
const { Router } = require("express");
const userController = require("../controllers/user-controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const publicMiddleware = require('../middlewares/public-middleware');
const multer = require('multer');

const router = Router(); //new Router()

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./src/avatars");//хз какое вместилище ставить
    },

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now().toString() + ".png");//mb add '' for filename
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const uploadAvatar = multer({storage: avatarStorage, fileFilter: fileFilter});

router.get('/', publicMiddleware, userController.getUsers);
router.get('/:id', publicMiddleware, userController.getOneUser);
// router.get('/test', adminMiddleware, userController.getTestAdmin);// когда ставишь этот гет, то он не совместим с айдишкой ибо тип "тест" за айдишку принимается
router.post('/', adminMiddleware, 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.adminRegistration); //try to check with ordinary registration func
router.patch('/avatar', authMiddleware, uploadAvatar.single('filedata'), userController.uploadAvatar);
router.patch('/:id', authMiddleware, userController.updateOne);
router.delete('/:id', authMiddleware, userController.deleteOne);

module.exports = router;