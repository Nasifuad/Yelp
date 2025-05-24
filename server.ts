import { app } from "./app";
import connectDB from "./config/db";
import config from "./config/config";

try {
  connectDB();
} catch (error) {
  console.log("error connecting the database", error);
} finally {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
}
