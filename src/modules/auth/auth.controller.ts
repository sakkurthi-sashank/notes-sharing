import { Request, Response } from "express";
import {
  createJWTToken,
  createUser,
  findUserByEmail,
  comparePassword,
} from "./auth.service";
import bcrypt from "bcrypt";

export const userSignUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email and password and name are required!" });
  }

  try {
    const user = await findUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await createUser({
      email,
      password: hashedPassword,
      displayName: name,
    });

    return res.status(201).json({ message: "User created!" });
  } catch {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const userSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const isPasswordValid = comparePassword(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = createJWTToken({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      createdAt: user.createdAt,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
