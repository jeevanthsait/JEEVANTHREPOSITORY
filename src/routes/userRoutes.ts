import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/admin-dashboard",
  authenticateJWT,
  authorizeRoles("admin"),
  (req: AuthRequest, res) => {
    res.json({ message: "Welcome Admin! Only admins can see this." });
  }
);
  
router.get(
  "/manager-report",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  (req: AuthRequest, res) => {
    res.json({ message: "Managers and Admins can view this report." });
  }
);

router.get("/profile", authenticateJWT, (req: AuthRequest, res) => {
  res.json({ message: "This is your profile.", user: req.user });
});

export default router;

