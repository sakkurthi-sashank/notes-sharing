import { Request, Response } from "express";
import {
  createUserNote,
  deleteNoteById,
  getAllNotesByUserId,
  getNoteById,
  updateNoteById,
  searchNotesByQuery,
  shareNoteWithUserByEmail,
} from "./notes.service";

export const getNotes = async (req: Request, res: Response) => {
  const user = res.locals.user;

  try {
    const notes = await getAllNotesByUserId(user.id);

    res.status(200).send({
      notes,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error getting notes",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { title, content } = req.body;

  try {
    await createUserNote({
      title,
      content,
      userId: user.id,
    });

    res.status(201).send({
      message: "Note created successfully",
    });
  } catch (e) {
    res.status(500).send({
      message: "Error creating note",
    });
  }
};

export const getNote = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { id } = req.params;

  try {
    const note = await getNoteById(id, user.id);

    res.status(200).send({
      note,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error getting note",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await updateNoteById(
      id,
      {
        title,
        content,
      },
      user.id,
    );

    res.status(200).send({
      message: "Note updated successfully",
    });
  } catch (e) {
    res.status(500).send({
      message: "Error updating note",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: "Note id is required",
    });
  }

  try {
    await deleteNoteById(id, user.id);
    res.status(200).send({
      message: "Note deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      message: "Error deleting note",
    });
  }
};

export const searchNotes = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { query } = req.params;

  try {
    const notes = await searchNotesByQuery(query, user.id);

    res.status(200).send({
      notes,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error searching notes",
    });
  }
};

export const shareNote = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { id } = req.params;
  const { email } = req.body;

  if (!email || !id) {
    res.status(400).send({
      message: "Email and note id are required",
    });
  }

  try {
    const message = await shareNoteWithUserByEmail(id, email, user.id);

    res.status(200).send({
      message: message,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error sharing note",
    });
  }
};
