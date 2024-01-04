import { db } from "../../db";

export const deleteNoteById = async (id: string, userId: string) => {
  try {
    db.deleteFrom("Notes").execute();
  } catch (e) {
    throw new Error("Error deleting note");
  }
};

export const updateNoteById = async (
  id: string,
  note: {
    content: string;
    title: string;
  },
  userId: string,
) => {
  try {
    return await db
      .updateTable("Notes")
      .set({
        content: note.content,
        title: note.title,
        updatedAt: new Date().toISOString(),
      })
      .where("id", "=", id)
      .where("authorId", "=", userId)
      .execute();
  } catch (e) {
    throw new Error("Error updating note");
  }
};

export const getNoteById = async (id: string, userId: string) => {
  try {
    const note = await db
      .selectFrom("Notes")
      .where((eb) => eb.and([eb("id", "=", id), eb("authorId", "=", userId)]))
      .selectAll()
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

    return newNote;
  } catch (e) {
    console.log(e);
    throw new Error("Error creating note");
  }
};

export const getAllNotesByUserId = async (userId: string) => {
  try {
    const notes = await db
      .selectFrom("Notes")
      .where("authorId", "=", userId)
      .selectAll()
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
        ]),
      )
      .selectAll()
      .limit(10)
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
  userId: string,
) => {
  try {
    const getIdByEmail = await db
      .selectFrom("User")
      .where("email", "=", email)
      .select("id")
      .execute();

    if (getIdByEmail.length === 0) {
      throw new Error("User not found");
    }

    const note = await db
      .selectFrom("Notes")
      .where("id", "=", noteId)
      .select(["id", "authorId"])
      .execute();

    if (note.length === 0) {
      throw new Error("Note not found");
    }

    if (note[0].authorId !== userId) {
      throw new Error("Note does not belong to this user");
    }

    const checkIfAlreadyShared = await db
      .selectFrom("SharingAccess")
      .where("noteId", "=", noteId)
      .where("userId", "=", getIdByEmail[0].id)
      .select("id")
      .execute();

    if (checkIfAlreadyShared.length > 0) {
      return "Note already shared with this user";
    }

    await db
      .insertInto("SharingAccess")
      .values({
        noteId: noteId,
        userId: getIdByEmail[0].id,
        updatedAt: new Date().toISOString(),
      })
      .execute();

    return "Note shared successfully";
  } catch (e) {
    console.log(e);
    throw new Error("Error sharing note");
  }
};
