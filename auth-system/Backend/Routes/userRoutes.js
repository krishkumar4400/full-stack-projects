import { Router } from "express";
import { getUserData } from "../Controllers/userController.js";
import userAuth from "../Middleware/userAuth.js";

const userRouter = Router();

userRouter.get('/data', userAuth, getUserData);

export default userRouter;