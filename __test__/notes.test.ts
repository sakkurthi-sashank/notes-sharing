import request from "supertest";
import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import { db } from "../src/db";
import { authRouter } from "../src/modules/auth/auth.router";
import { notesRouter } from "../src/modules/notes/notes.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

afterAll(async () => {
  await db.deleteFrom("SharingAccess").execute();
  await db.deleteFrom("Notes").execute();
  await db.deleteFrom("User").execute();
  await db.destroy();
});

let token: string;

describe("Auth API endpoints", () => {
  it("should sign up a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "testPassword",
      name: "Test User",
    };

    const response = await request(app)
      .post("/auth/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(201);

    token = response.body;

    expect(response.body.message).toBe("User created!");
  });

  it("create a new user for sharing", async () => {
    const userData = {
      email: "share@gmail.com",
      password: "testPassword",
      name: "Share User",
    };

    const response = await request(app)
      .post("/auth/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("should log in an existing user", async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "testPassword",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(userCredentials)
      .expect("Content-Type", /json/)
      .expect(200);

    token = response.body.token;

    expect(response.body).toHaveProperty("token");
  });
});

let notesId: string;
app.use("/notes", notesRouter);

describe("Notes API endpoints", () => {
  it("should create a new note", async () => {
    const noteData = {
      title: "A Good Note Book",
      content: "I Love Good Note Books",
    };

    const response = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(noteData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.message).toBe("Note created successfully");
  });

  it("should get all notes", async () => {
    const response = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    notesId = response.body.notes[0].id;

    expect(response.body).toHaveProperty("notes");
  });

  it("should get a note by id", async () => {
    const response = await request(app)
      .get(`/notes/${notesId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("note");
  });

  it("should update a note by id", async () => {
    const noteData = {
      title: "A Good Note Book By Sashank",
      content: "I Love Good Note Books",
    };

    const response = await request(app)
      .put(`/notes/${notesId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(noteData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBe("Note updated successfully");
  });

  it("should delete a note by id", async () => {
    const response = await request(app)
      .delete(`/notes/${notesId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBe("Note deleted successfully");
  });

  it("should create a new note again", async () => {
    const noteData = {
      title: "A Good Note Book",
      content: "I Love Good Note Books",
    };

    const response = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(noteData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.message).toBe("Note created successfully");
  });

  it("should get all notes again", async () => {
    const response = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    notesId = response.body.notes[0].id;

    expect(response.body).toHaveProperty("notes");
  });

  it("should share a note with another user", async () => {
    const sharingData = {
      email: "share@gmail.com",
    };

    const response = await request(app)
      .get(`/notes/${notesId}/share`)
      .set("Authorization", `Bearer ${token}`)
      .send(sharingData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBe("Note shared successfully");
  });

  it("should search notes by query", async () => {
    const response = await request(app)
      .get(`/notes/search/g`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("notes");
  });
});
