import request from "supertest";
import express, { Express } from "express";
import { authRouter } from "../src/modules/auth/auth.router";

const app: Express = express();
app.use(express.json());
app.use("/auth", authRouter);

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

    expect(response.body.message).toBe("User created!");
  });

  it("should handle existing user on sign up", async () => {
    const existingUserData = {
      email: "existing@example.com",
      password: "existingPassword",
      name: "Existing User",
    };

    await request(app).post("/auth/signup").send(existingUserData);

    const response = await request(app)
      .post("/auth/signup")
      .send(existingUserData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.message).toBe("User already exists!");
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

    expect(response.body).toHaveProperty("token");
  });

  it("should handle non-existing user on login", async () => {
    const nonExistingUserCredentials = {
      email: "nonexisting@example.com",
      password: "nonExistingPassword",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(nonExistingUserCredentials)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.message).toBe("User does not exist!");
  });

  it("should handle invalid password on login", async () => {
    const invalidPasswordCredentials = {
      email: "test@example.com",
      password: "invalidPassword",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidPasswordCredentials)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.message).toBe("Invalid password!");
  });
});
