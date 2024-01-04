import { db } from "../../db";

export const deleteNoteById = async (id: string, userId: string) => {
  try {
    const note = await db
      .deleteFrom("Notes")
      .where((eb) => eb.and([eb("id", "=", id), eb("authorId", "=", userId)]))
      .execute();

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (e) {
    throw new Error("Error deleting note");
  }
};

export const updateNoteById = async (
  id: string,
  note: {
    content: string;
    title: string;
  }
) => {
  try {
    const updatedNote = await db
      .updateTable("Notes")
      .set({
        content: note.content,
        title: note.title,
        updatedAt: new Date().toISOString(),
      })
      .where("id", "=", id)
      .execute();

    if (!updatedNote) {
      throw new Error("Note not found");
    }

    return updatedNote;
  } catch (e) {
    throw new Error("Error updating note");
  }
};

export const getNoteById = async (id: string, userId: string) => {
  try {
    const note = await db
      .selectFrom("Notes")
      .where((eb) => eb.and([eb("id", "=", id), eb("authorId", "=", userId)]))
      .execute();

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (e) {
    throw new Error("Error getting note");
  }
};

export const createUserNote = async (note: {
  content: string;
  title: string;
  userId: string;
}) => {
  try {
    const newNote = await db
      .insertInto("Notes")
      .values({
        authorId: note.userId,
        content: note.content,
        title: note.title,
        updatedAt: new Date().toISOString(),
      })
      .execute();

    if (!newNote) {
      throw new Error("Error creating note");
    }

    return newNote;
  } catch (e) {
    throw new Error("Error creating note");
  }
};

export const getAllNotesByUserId = async (userId: string) => {
  try {
    const notes = await db
      .selectFrom("Notes")
      .where("authorId", "=", userId)
      .execute();

    if (!notes) {
      throw new Error("Notes not found");
    }

    return notes;
  } catch (e) {
    throw new Error("Error getting notes");
  }
};

export const searchNotesByQuery = async (query: string, userId: string) => {
  try {
    const notes = await db
      .selectFrom("Notes")
      .where((eb) =>
        eb.and([
          eb("authorId", "=", userId),
          eb.or([
            eb("content", "like", `%${query}%`),
            eb("title", "like", `%${query}%`),
          ]),
        ])
      )
      .execute();

    if (!notes) {
      throw new Error("Notes not found");
    }

    return notes;
  } catch (e) {
    throw new Error("Error getting notes");
  }
};

export const shareNoteWithUserByEmail = async (
  noteId: string,
  email: string,
  userId: string
) => {
  try {
    const getIdByEmail = await db
      .selectFrom("User")
      .where("email", "=", email)
      .select("id")
      .execute();

    if (!getIdByEmail) {
      throw new Error("User not found");
    }

    const note = await db
      .selectFrom("Notes")
      .where((eb) =>
        eb.and([eb("id", "=", noteId), eb("authorId", "=", userId)])
      )
      .select("id")
      .execute();

    if (!note) {
      throw new Error("Note not found");
    }

    const sharedNote = await db
      .insertInto("SharingAccess")
      .values({
        noteId: note[0].id,
        userId: getIdByEmail[0].id,
        updatedAt: new Date().toISOString(),
      })
      .execute();

    if (!sharedNote) {
      throw new Error("Error sharing note");
    }

    return sharedNote;
  } catch (e) {
    throw new Error("Error sharing note");
  }
};
