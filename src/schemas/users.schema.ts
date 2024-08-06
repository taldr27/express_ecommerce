import { z } from "zod";

export const CreateUserSchema = z
  .object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["USER", "CLIENT"]),
  })
  .strict();

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.enum(["USER", "CLIENT"]).optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
