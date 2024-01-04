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
    const createdNote = await createUserNote({
      title,
      content,
      userId: user.id,
    });

    res.status(200).send({
      note: createdNote,
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
    const updatedNote = await updateNoteById(id, {
      title,
      content,
    });

    res.status(200).send({
      note: updatedNote,
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

  try {
    const deletedNote = await deleteNoteById(id, user.id);

    res.status(200).send({
      note: deletedNote,
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

  try {
    const note = await shareNoteWithUserByEmail(id, email, user.id);

    res.status(200).send({
      note,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error sharing note",
    });
  }
};
