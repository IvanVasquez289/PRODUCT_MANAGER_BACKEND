"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
class ProductsController {
    constructor(productService) {
        this.productService = productService;
        this.handleError = (error, res) => {
            if (error instanceof custom_error_1.CustomError) {
                if (error.errors)
                    return res.status(error.statusCode).json({ errors: error.errors });
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal server error' });
        };
        this.getProducts = (req, res) => {
            this.productService.getProducts()
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.createProduct = (req, res) => {
            this.productService.createProduct(req)
                .then((data) => res.status(201).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.getProductById = (req, res) => {
            this.productService.getProductById(req)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.updateProduct = (req, res) => {
            this.productService.updateProduct(req)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.updateAvailability = (req, res) => {
            this.productService.updateAvailability(req)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.deleteProduct = (req, res) => {
            this.productService.deleteProduct(req)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.ProductsController = ProductsController;
