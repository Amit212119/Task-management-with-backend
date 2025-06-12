import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routers

import userRouter from "./router/user.router.js";
import taskRouter from "./router/task.router.js";

app.use("/user", userRouter);
app.use("/task", taskRouter);




export { app };