const User = require('../models/user');
const { Router } = require("express");
const userController = require("../controllers/user-controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = Router(); //new Router()

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/password-reset', userController.passwordReset);//нужная хуйня находится там где юзер создаётся кароч
router.post('/password-reset/:token', userController.passwordResetConfirm);//id = confirm token
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activateLink);

module.exports = router;