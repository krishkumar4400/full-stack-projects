import errorMessage from "../utils/errorMessage.utils.js";
import jwt from 'jsonwebtoken';

export async function authenticationMiddleware(req,res,next) {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).json({
                message: "You are not logged in",
                success: false 
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.userId;
        next();
    } catch (error) {
        console.error(error);
        return errorMessage(req,res);
    }
}

export async function ensureAuthenticated(req,res,next) {
    if(!req.user)  {
        return res.status(401).json({
            message: "You are not logged in",
            success: false 
        });
    }

    next();
}