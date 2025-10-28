import express from "express";
import exerciseRouter from "./modules/exercises/exercise.routes.js";
import { requestErrorHandlerMiddleware } from "./shared/middlewares/request-error-handler.js";

const app = express();

app.use(express.json());
app.use("/exercise", exerciseRouter);
app.use(requestErrorHandlerMiddleware);

export default app;
