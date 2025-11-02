import express from "express";
import exerciseRouter from "./modules/exercises/exercise.routes.js";
import { requestErrorHandlerMiddleware } from "./shared/middlewares/request-error-handler.js";
import trainingSplitRouter from "./modules/training-splits/training-split.router.js";

const app = express();

app.use(express.json());

app.use("/exercise", exerciseRouter);
app.use("/training-split", trainingSplitRouter);

app.use(requestErrorHandlerMiddleware);

export default app;
