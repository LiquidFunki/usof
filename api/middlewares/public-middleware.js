const ApiError = require('../exceptions/api-error'); 
const tokenService = require('../service/token-service');
const Token  = require('../models/Token');

module.exports = async function(req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;

        if(authorizationHeader){
            const accessToken = authorizationHeader.split(' ')[1];

            const userData = tokenService.validateAccessToken(accessToken);
            
            req.user = userData;
        } else {
            req.user = {};
        }

       const qFilter = req.query.filter;
        // console.log(qFilter);
        if(qFilter){
            req.filter = qFilter.split(',');
        } 
        
        const categoriesFilter = req.query.categoriesFilter;
        if(categoriesFilter){
            console.log(categoriesFilter);
            req.categoriesFilter = categoriesFilter.split(',');
        }

        const page = req.query.page;
        if(page){
            req.page = page;
        } else {
            req.page = 1;
        }

        const userFilter = req.query.userFilter;
        if(userFilter) {
            req.userFilter = userFilter;
        }

        const dateFilter = req.query.dateFilter;
        if(dateFilter) {
            req.dateFilter = dateFilter;
        }

        const sort = req.query.sort;
        if(sort){
            req.sort = sort.split(',');
        } else {
            req.sort = ["date", "desc"];
        }

        next();
    } catch(e) {
        return next(ApiError.UnathorizedError());
    }
};
