import { Router } from "express";
import { journalRoute } from "./journal.route";
import { verifyToken } from "../middleware/checkAuth";
import {
  login,
  signUp,
  logout,
  authenticate,
} from "../controllers/auth.controller";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/authenticate", verifyToken, authenticate);
export const authRoute = router;
