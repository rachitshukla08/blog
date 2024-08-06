import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("mongodb connection established"))
  .catch((e) => console.log(e));

const app = express();
app.listen(3000, () => {
  console.log("listening on: 3000");
});
