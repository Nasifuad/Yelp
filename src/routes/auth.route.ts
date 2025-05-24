import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("Hello World! from auth");
});

export const authRoute = route;
