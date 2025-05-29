import Journal from "../models/journal.model";
import { Response, Request } from "express";
import { ResponseError } from "../error/response.error";
import asyncHandler from "../services/asyncHandler";
const getJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const journal = await Journal.find();
    res.json(journal);
  } catch (error) {
    console.log("Error occured at getJournal controller", error);
  }
};

const postJournal = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userName = req.user;
      const { title, body, tags } = req.body;
      const journal = await Journal.create({
        title,
        body,
        author: userName,
        tags,
      });
      res.json(journal);
      console.log(journal);
    } catch (error) {
      new ResponseError("Error occured at postJournal controller");
    }
  }
);

const updateJournal = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userName = req.user;
      const journalId = req.params.id;
      const { title, body, tags } = req.body;
      const journal = await Journal.findOneAndUpdate(
        { _id: journalId, author: userName },
        { title, body, tags },
        { new: true }
      );
      res.json(journal);
    } catch (error) {
      new ResponseError("Error occured at updateJournal controller");
    }
  }
);
const deleteJournal = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userName = req.user;
      const journalId = req.params.id;
      const journal = await Journal.findOneAndDelete({
        _id: journalId,
        author: userName,
      });
      res.json(journal);
    } catch (error) {
      new ResponseError("Error occured at deleteJournal controller");
    }
  }
);
export { getJournal, postJournal, updateJournal, deleteJournal };
