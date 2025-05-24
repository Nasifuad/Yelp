import { app } from "./app";
import connectDB from "./config/db";
import config from "./config/config";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`✅ Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("❌ Could not start server:", error);
    process.exit(1);
  }
};

startServer();
