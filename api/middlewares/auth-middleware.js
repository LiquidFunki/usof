// const { off } = require('../db/db');
const ApiError = require('../exceptions/api-error'); 
const tokenService = require('../service/token-service');
const Token  = require('../models/Token');

module.exports = async function(req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader) return next(ApiError.UnathorizedError());

        const accessToken = authorizationHeader.split(' ')[1];

        if(!accessToken) return next(ApiError.UnathorizedError());
        
        const userData = tokenService.validateAccessToken(accessToken);
        
        if(!userData) return next(ApiError.UnathorizedError());

        const token = await new Token({}).findBy('author_id', userData.id);
        if(!token) return next(ApiError.UnathorizedError());
   
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnathorizedError());
    }
};
