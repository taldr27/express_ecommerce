import { Request, Response } from "express";
import { ZodError } from "zod";
import { CreateSaleSchema } from "../schemas/sales.schema";
import { prisma } from "../config/prisma";

export const CreateSale = async (request: Request, response: Response) => {
  try {
    const { body } = request;
    const validatedBody = CreateSaleSchema.parse(body);

    let sale;
    await prisma.$transaction(async (tx) => {
      sale = await tx.sale.create({
        data: {
          total: validatedBody.total,
          user_id: validatedBody.user_id,
          saleDetail: {
            create: validatedBody.details,
          },
        },
      });

      for (const element of validatedBody.details) {
        const detail = element;

        await tx.products.update({
          where: {
            id: detail.product_id,
          },
          data: {
            stock: {
              decrement: detail.quantity,
            },
          },
        });
      }
    });

    return response.status(201).json(sale);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({ errors: error.issues });
    }
    if (error instanceof Error) {
      return response.status(500).json({ errors: error.message });
    }
  }
};
