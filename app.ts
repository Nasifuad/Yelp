import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/root.routes";
import { errorHandler } from "./src/utility/errorHandler";
const app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.use(cookieParser());
app.use(errorHandler);
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
export { app };
