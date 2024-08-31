import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import connectDB from "./config/db";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookiesParser());


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api/v1", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
