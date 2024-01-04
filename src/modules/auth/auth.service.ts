import { db } from "../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (user: {
  displayName: string;
  email: string;
  password: string;
}) => {
  try {
    await db
      .insertInto("User")
      .values({
        displayName: user.displayName,
        email: user.email,
        hashedPassword: user.password,
        updatedAt: new Date(),
      })
      .executeTakeFirst();
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const findUserByEmail = (email: string) => {
  try {
    return db
      .selectFrom("User")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  } catch (error) {
    throw new Error("Error finding user");
  }
};

export const createJWTToken = (user: {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
}) => {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyJWTToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
