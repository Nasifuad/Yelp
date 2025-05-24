import Express from "express";
import cors from "cors";
const app = Express();

app.use(Express.json());
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));

app.use("/", (req, res) => {
  res.send("Hello World!");
});
export { app };
