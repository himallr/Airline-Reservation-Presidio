import express from 'express';
import { getUsers,getUserByID, Signup, loginUser } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get("/",getUsers);
userRoute.get("/:id",getUserByID);
userRoute.post("/signup",Signup);
userRoute.post("/login",loginUser);
// userRoute.delete("/:id",deleteUserDetails);

export default userRoute;