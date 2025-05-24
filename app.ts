import Express from "express";
import cors from "cors";
import router from "./src/routes/root.routes";
const app = Express();

app.use(Express.json());
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));

app.use("/api", router);
export { app };
