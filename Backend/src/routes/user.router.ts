import { Router } from "express";
import { getMyRoleBasedProfile, sendOTPOnEmail, verifyEmail } from "../controllers/user.controller";
import { PromiseHandler } from "../modules/v1/common/middlewares";
import { isAuthenticated } from "../middlewares/authentication";

const userRouter = Router();

userRouter.post("/sendEmailForVerification" , PromiseHandler(sendOTPOnEmail))
userRouter.post("/verifyEmail" , PromiseHandler(verifyEmail))
userRouter.post("/getMyRoleBasedProfile" , isAuthenticated ,PromiseHandler(getMyRoleBasedProfile))
export {userRouter} 