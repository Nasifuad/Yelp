import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/root.routes";
const app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.use(cookieParser());
app.use("/api", router);
export { app };
