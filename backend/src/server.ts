import app from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
