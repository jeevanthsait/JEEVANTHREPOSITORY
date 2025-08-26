import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";
// import router from "./userRoutes";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, getProfile);

export default router;
