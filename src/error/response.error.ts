import { Error } from "mongoose";

export class ResponseError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype); // Important for instanceof to work

    this.name = "ResponseError";
    this.status = status; // ✅ Now works safely
  }
}
