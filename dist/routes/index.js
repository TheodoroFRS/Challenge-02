"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutorsRoutes_1 = __importDefault(require("./tutorsRoutes"));
const petsRoutes_1 = __importDefault(require("./petsRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).json({ message: `Api Challenge #02` });
    });
    app.use(tutorsRoutes_1.default, petsRoutes_1.default, authRoutes_1.default);
};
exports.default = routes;
