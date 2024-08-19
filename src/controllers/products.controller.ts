import { Request, Response } from "express";
import { CreateProductSchema } from "../schemas/products.schema";
import { ZodError } from "zod";
import { s3Client } from "../config/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../config/prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { file } = req;

    if (!file) {
      throw new Error("Image is required");
    }

    const { body } = req;

    const newBody = {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      stock: parseInt(body.stock),
    };

    const validatedBody = CreateProductSchema.parse(newBody);

    const s3Response = await s3Client.send(
      new PutObjectCommand({
        Bucket: "express-ecommerce-test",
        Key: file.originalname,
        Body: file.buffer,
      })
    );

    if (s3Response.$metadata.httpStatusCode !== 200) {
      throw new Error("Error uploading image to S3");
    }

    const product = await prisma.products.create({
      data: {
        ...validatedBody,
        image: file.originalname,
      },
    });

    return res.status(201).json({ message: "Product created", data: product });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    if (error instanceof Error) {
      res.status(500).json({ errors: error.message });
    }
  }
};
