import express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173", "http://finvix_ui:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// Initialize TypeORM, then start the server.
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
