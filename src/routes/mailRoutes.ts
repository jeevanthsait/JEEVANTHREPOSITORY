import { Router } from "express";
import { sendMailController } from "../controllers/emailControllers";

const router = Router();

// POST /api/mail/send
router.post("/send", sendMailController);

export default router;
