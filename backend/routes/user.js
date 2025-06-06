import express from "express";
import {login,signup} from "../controllers/user.js";
import wrapAsync from "../utils/wrapAsync.js";

const router=express.Router();

router
    .route("/signup")
    .post(wrapAsync(signup))
    
router
    .route("/login")
    .post(wrapAsync(login))    

export default router;   