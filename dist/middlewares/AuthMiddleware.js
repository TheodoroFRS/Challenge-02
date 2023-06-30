"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Tutor = require("../models/Tutor");
const AuthMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: true, code: 401, message: "Authentication Invalid, not authorized" });
        }
        const token = authorizationHeader.split(" ");
        if (token.length !== 2 || token[0] !== "Bearer") {
            return res.status(401).json({ error: true, code: 401, message: "Invalid token format" });
        }
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jsonwebtoken_1.default.verify(token[1], secret);
        if (typeof decoded === 'string') {
            return res.status(401).json({ error: true, code: 401, message: "decoded is a string" });
        } //
        const tutor = await Tutor.findById(decoded.id);
        if (!tutor) {
            return res.status(404).json({ error: true, code: 404, message: "tutor not found" });
        }
        const tutorId = decoded.id;
        req = tutorId;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: true, code: 401, message: "Not authorized" });
    }
};
exports.default = AuthMiddleware;
