import express from "express";
import cors from "cors";
import exerciseRouter from "./modules/exercises/exercise.routes.js";
import { requestErrorHandlerMiddleware } from "./shared/middlewares/request-error-handler.js";
import trainingSplitRouter from "./modules/training-splits/training-split.router.js";
import trainingSplitDayRouter from "./modules/training-split-day/training-split-day.router.js";
import workoutRouter from "./modules/workout/workout.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/exercise", exerciseRouter);
app.use("/training-split", trainingSplitRouter);
app.use("/training-split-day", trainingSplitDayRouter);
app.use("/workout", workoutRouter);

app.use(requestErrorHandlerMiddleware);

export default app;
