import { Request, Response } from "express";
import Product from "../../data/postgres/models/product.model";
import { CustomError } from "../../domain/errors/custom.error";
import { check, param, validationResult } from "express-validator";

export class ProductService {
  constructor() {}

  async createProduct(req: Request) {
    try {
      const product = await Product.create(req.body);

      return {
        data: product,
      };
    } catch (error) {
      throw CustomError.internalServer("Error al crear el producto");
    }
  }

  async getProducts() {
    try {
      const products = await Product.findAll({
        order: [["price", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return {
        data: products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProductById(req: Request) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) throw CustomError.notFound("El producto no existe");
      return {
        data: product,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateProduct(req: Request) {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw CustomError.notFound("El producto no existe");

    try {
      await product.update(req.body);
      await product.save();
      return {
        data: product,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateAvailability(req: Request) {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw CustomError.notFound("El producto no existe");
    console.log(req.body.availability)
    try {
      product.availability = !product.availability
      await product.save();
      return {
        data: product,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

}
