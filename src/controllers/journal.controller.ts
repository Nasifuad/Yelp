import Journal from "../models/journal.model";
import { Response, Request } from "express";
import { ResponseError } from "../error/response.error";
import asyncHandler from "../services/asyncHandler";
import { JwtPayload } from "jsonwebtoken";
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
      const { userName } = req.user as JwtPayload;
      const { title, body, tags } = req.body;
      const journal = await Journal.create({
        title,
        body,
        author: userName,
        tags,
      });
      res.json({
        journal,
        message: "Journal created successfully",
        response: 200,
      });
      console.log(journal);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error occured at postJournal controller" });
      console.log("Error occured at postJournal controller", error);
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
        { _id: journalId },
        { title, body, tags },
        { new: true }
      );
      res.json({
        message: "Journal updated successfully",
        journal,
        response: 200,
      });
    } catch (error) {
      res.json({
        message: "Error occured at updateJournal controller",
        error,
        response: 400,
      });
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
      res.json({
        message: "Journal deleted successfully",
        journal,
        response: 200,
      });
    } catch (error) {
      new ResponseError("Error occured at deleteJournal controller");
    }
  }
);
export { getJournal, postJournal, updateJournal, deleteJournal };
