import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  searchNotes,
  shareNote,
  updateNote,
} from "./notes.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export const notesRouter = express.Router();

notesRouter.get("/", authMiddleware, getNotes);
notesRouter.get("/:id", authMiddleware, getNote);
notesRouter.post("/", authMiddleware, createNote);
notesRouter.put("/:id", authMiddleware, updateNote);
notesRouter.delete("/:id", authMiddleware, deleteNote);
notesRouter.get("/:id/share", authMiddleware, shareNote);
notesRouter.get("/search/:query", authMiddleware, searchNotes);
