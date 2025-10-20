import express from "express";
import exerciseRouter from "./modules/exercises/exercise.routes.js";
import { requestErrorHandlerMiddleware } from "./shared/middlewares/request-error.js";

const app = express();

app.use(express.json());
app.use(requestErrorHandlerMiddleware);
app.use("/exercise", exerciseRouter);

export default app;
