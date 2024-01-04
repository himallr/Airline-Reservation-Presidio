import express from "express";
import { Signup, getAdmin, getAdminById, loginAdmin } from "../controllers/adminController.js";

const AdminRouter = express.Router();

AdminRouter.get("/", getAdmin);
AdminRouter.get("/:id", getAdminById);
AdminRouter.post("/signup", Signup);
AdminRouter.post("/login", loginAdmin);


export default AdminRouter;