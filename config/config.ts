import { configDotenv } from "dotenv";

configDotenv();
interface Config {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}
const config = {
  PORT: parseInt(process.env.PORT || "3000"),
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};

export default config;
