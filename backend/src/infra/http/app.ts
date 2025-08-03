import "reflect-metadata";
import "./../container/index";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../database/data-source";
import { errorHandler } from "./middleware/error-handler";
import { UserRoutes } from "./routes/user.routes";
import { TaskListRoutes } from "./routes/task-list.routes";
import { TaskRoutes } from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/users", UserRoutes());
app.use("/api/lists", TaskListRoutes());
app.use("/api/tasks", TaskRoutes());

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

export default app;
