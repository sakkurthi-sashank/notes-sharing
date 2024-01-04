import request from "supertest";
import express, { Express } from "express";
import { notesRouter } from "../src/modules/notes/notes.router";

const app: Express = express();
app.use(express.json());
app.use("/notes", notesRouter);

describe("Notes API endpoints", () => {
  it("should create a new note", async () => {
    const noteData = {
      title: "Test Note",
      content: "Test Note Content",
    };

    const response = await request(app)
      .post("/notes")
      .send(noteData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.note.title).toBe(noteData.title);
    expect(response.body.note.content).toBe(noteData.content);
  });

  it("should get all notes", async () => {
    const response = await request(app)
      .get("/notes")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.notes.length).toBe(1);
  });

  it("should get a note by id", async () => {
    const response = await request(app)
      .get("/notes/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.note.id).toBe(1);
  });

  it("should update a note by id", async () => {
    const updatedNoteData = {
      title: "Updated Test Note",
      content: "Updated Test Note Content",
    };

    const response = await request(app)
      .put("/notes/1")
      .send(updatedNoteData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.note.title).toBe(updatedNoteData.title);
    expect(response.body.note.content).toBe(updatedNoteData.content);
  });

  it("should delete a note by id", async () => {
    const response = await request(app)
      .delete("/notes/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.note.id).toBe(1);
  });

  it("should search notes by query", async () => {
    const response = await request(app)
      .get("/notes/search/test")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.notes.length).toBe(1);
  });

  it("should share a note with user by email", async () => {
    const shareNoteData = {
      email: "test@gmail.com",
    };
  });
});
