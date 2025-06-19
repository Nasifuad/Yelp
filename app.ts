import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/root.routes";
import { errorHandler } from "./src/utility/errorHandler";

const app = express();

// Static files
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// Body parsers — safe for JSON and URL-encoded forms
app.use(
  express.json({
    limit: "50mb",
    type: "application/json", // only parse application/json
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    type: "application/x-www-form-urlencoded",
  })
);

// CORS config
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

// ✅ Main Router — goes AFTER body parsers
app.use("/api", router);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// ✅ Error handler — must go AFTER routes
app.use(errorHandler);

export { app };
