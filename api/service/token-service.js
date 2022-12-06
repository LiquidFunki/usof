const jwt = require('jsonwebtoken');
const Token = require("../models/Token");// maybe make "./models/Token"
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

class TokenService {
    
generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(author_id, refresh_token) {
        const bebra = {author_id, refresh_token}
        // const tokenData = await new Token({}).isExist(bebra.author_id);//if dont work, try to delete these brackets {}
        const tokenData = await new Token({}).findBy("author_id", bebra.author_id);//if dont work, try to delete these brackets {}
        if (tokenData) {
            // console.log(tokenData);
            // console.log(refresh_token);
            tokenData.refresh_token = refresh_token;
            return tokenData.save();//я кароч запутался, как тут сейвится это, но вродь, мы стягиваем существующий токен и потом меняем рефреш и сейвим
        }
        const token = new Token(bebra);
        await token.save();
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await new Token({}).findBy("refresh_token", refreshToken); 
        await new Token({}).delete('refresh_token', refreshToken);
        return tokenData;
    }

    async findOneToken(refreshToken) {
        const tokenData = await new Token({}).findBy("refresh_token", refreshToken); 
        return tokenData;
    }
}

module.exports = new TokenService();