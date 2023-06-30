"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv").config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); // para documentação com o swagger
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); // para documentação com o swagger
const head_1 = __importDefault(require("./docs/head")); // importando configurações do swagger
// cabeçalho da documentação
const swaggerDocs = (0, swagger_jsdoc_1.default)(head_1.default);
app_1.default.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
//app.listen(port, () => console.log(`Server is listening on port ${port}...`));
