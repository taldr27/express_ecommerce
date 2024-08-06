import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { CreateUserSchema, LoginSchema } from "../schemas/users.schema";
import bcrypt from "bcrypt";
import { IPayload, ISignupResponse, IErrorResponse } from "../types";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const signup = async (
  req: Request,
  res: Response<ISignupResponse | IErrorResponse>
) => {
  try {
    const { body } = req;
    const validatedBody = CreateUserSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: validatedBody.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    validatedBody.password = await bcrypt.hash(validatedBody.password, 10);

    const newUser = await prisma.user.create({
      data: validatedBody,
    });

    const payload: IPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("Secret key not found");
    }
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    return res.status(201).json({ access_token: accessToken });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    if (error instanceof Error) {
      return res.status(500).json({ errors: error.message });
    }
  }
};

export const login = async (
  req: Request,
  res: Response<ISignupResponse | IErrorResponse>
) => {
  try {
    const { body } = req;
    const validatedBody = LoginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: validatedBody.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(
      validatedBody.password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("Credentials are not valid");
    }

    const payload: IPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("Secret key not found");
    }

    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    return res.status(200).json({ access_token: accessToken });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    if (error instanceof Error) {
      return res.status(500).json({ errors: error.message });
    }
  }
};
