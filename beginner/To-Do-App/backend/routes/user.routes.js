import { Router } from "express";
import { logout, userLogin, userRegister } from "../Controllers/user.controller.js";
import { authenticationMiddleware, ensureAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", userRegister);
userRouter.post('/login', userLogin);

userRouter.post('/logout',authenticationMiddleware, ensureAuthenticated, logout);

export default userRouter;
