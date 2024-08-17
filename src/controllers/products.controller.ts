import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    console.log(file);
    const { body } = req;

    console.log(body);
    return res.status(201).json({ message: "Product created", data: body });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ errors: error.message });
    }
  }
};
