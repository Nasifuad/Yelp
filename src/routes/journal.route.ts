import { Router } from "express";
import { verifyToken } from "../middleware/checkAuth";
import {
  getJournal,
  postJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.controller";

const router = Router();

router.post("/postJournal", verifyToken, postJournal);
router.get("/getJournal", verifyToken, getJournal);
router.post("/update/:id", verifyToken, updateJournal);
router.delete("/delete/:id", verifyToken, deleteJournal);

export const journalRoute = router;
