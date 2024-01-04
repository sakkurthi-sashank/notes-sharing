import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { authRouter } from "./modules/auth/auth.router";
import { notesRouter } from "./modules/notes/notes.router";

const app = express();

app.get("/server", (req, res) => {
  res.send({
    message: "Server is up and running!",
  });
});

app.use("/api/auth/", authRouter);
app.use("/api/notes", notesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
