"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("../../data/postgres/models/product.model"));
const custom_error_1 = require("../../domain/errors/custom.error");
class ProductService {
    constructor() { }
    createProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.create(req.body);
                return {
                    data: product,
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer("Error al crear el producto");
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.default.findAll({
                    order: [["price", "DESC"]],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                });
                return {
                    data: products,
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    getProductById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield product_model_1.default.findByPk(id);
                if (!product)
                    throw custom_error_1.CustomError.notFound("El producto no existe");
                return {
                    data: product,
                };
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError)
                    throw error;
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    updateProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield product_model_1.default.findByPk(id);
            if (!product)
                throw custom_error_1.CustomError.notFound("El producto no existe");
            try {
                yield product.update(req.body);
                yield product.save();
                return {
                    data: product,
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    updateAvailability(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield product_model_1.default.findByPk(id);
            if (!product)
                throw custom_error_1.CustomError.notFound("El producto no existe");
            try {
                product.availability = !product.availability;
                yield product.save();
                return {
                    data: product,
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    deleteProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield product_model_1.default.findByPk(id);
            if (!product)
                throw custom_error_1.CustomError.notFound("El producto no existe");
            try {
                yield product.destroy();
                return {
                    data: product,
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
}
exports.ProductService = ProductService;
