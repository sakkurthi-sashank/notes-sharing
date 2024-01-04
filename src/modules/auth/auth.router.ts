import express from "express";
import { userSignIn, userSignUp } from "./auth.controller";

export const authRouter = express.Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/login", userSignIn);
