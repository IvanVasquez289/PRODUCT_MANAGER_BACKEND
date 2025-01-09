"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const product_service_1 = require("../services/product-service");
const field_validation_middleware_1 = require("../middlewares/field-validation.middleware");
const express_validator_adapter_1 = require("../../config/express-validator-adapter");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const productService = new product_service_1.ProductService;
        const controller = new controller_1.ProductsController(productService);
        //Definir las rutas
        router.get('/', controller.getProducts);
        router.post('/', [
            express_validator_adapter_1.ExpressValidatorAdapter.validateString('name'),
            express_validator_adapter_1.ExpressValidatorAdapter.validateNumber('price'),
            field_validation_middleware_1.FieldValidationMiddleware.ValidateErrors
        ], controller.createProduct);
        router.get('/:id', [
            express_validator_adapter_1.ExpressValidatorAdapter.validateParam(),
            field_validation_middleware_1.FieldValidationMiddleware.ValidateErrors
        ], controller.getProductById);
        router.put('/:id', [
            express_validator_adapter_1.ExpressValidatorAdapter.validateParam(),
            express_validator_adapter_1.ExpressValidatorAdapter.validateString('name'),
            express_validator_adapter_1.ExpressValidatorAdapter.validateNumber('price'),
            express_validator_adapter_1.ExpressValidatorAdapter.validateBoolean('availability'),
            field_validation_middleware_1.FieldValidationMiddleware.ValidateErrors
        ], controller.updateProduct);
        router.patch('/:id', [
            express_validator_adapter_1.ExpressValidatorAdapter.validateParam(),
            field_validation_middleware_1.FieldValidationMiddleware.ValidateErrors
        ], controller.updateAvailability);
        router.delete('/:id', [
            express_validator_adapter_1.ExpressValidatorAdapter.validateParam(),
            field_validation_middleware_1.FieldValidationMiddleware.ValidateErrors
        ], controller.deleteProduct);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
