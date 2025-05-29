import { Router } from "express";
import { verifyToken } from "../middleware/checkAuth";
import {
  getJournal,
  postJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.controller";

const router = Router();

router.post("/", verifyToken, postJournal);
router.get("/", verifyToken, getJournal);
router.put("/:id", verifyToken, updateJournal);
router.delete("/:id", verifyToken, deleteJournal);

export const journalRoute = router;
