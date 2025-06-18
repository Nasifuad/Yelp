import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/root.routes";
import { errorHandler } from "./src/utility/errorHandler";
const app = Express();

app.use(Express.json());

const allowedOrigins = [
  "https://aroma-bangla-client.vercel.app",
  "http://localhost:3000",
  "https://your-second-origin.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
