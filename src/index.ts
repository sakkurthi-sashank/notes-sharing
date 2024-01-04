import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { authRouter } from "./modules/auth/auth.router";
import { notesRouter } from "./modules/notes/notes.router";
import { rateLimitMiddleware } from "./middleware/rateLimiter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(rateLimitMiddleware);

app.get("/server", (req, res) => {
  res.send({
    message: "Server is up and running!",
  });
});

app.use("/api/auth/", authRouter);
app.use("/api/notes/", notesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
