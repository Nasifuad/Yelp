import { Error } from "mongoose";

export class ResponseError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = "ResponseError";
    this.status = status;
  }
}
