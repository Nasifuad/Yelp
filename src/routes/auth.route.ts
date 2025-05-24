import { Router } from "express";
import { journalRoute } from "./journal.route";
import { signUp } from "../controllers/auth.controller";
const router = Router();

router.post("/signup", signUp);
router.use("/journal", (req, res) => {
  res.send("Journal route");
});

export const authRoute = router;
