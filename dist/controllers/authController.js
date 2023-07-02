"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tutor = require("../models/Tutor");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (req, res) => {
    const { email, password } = req.body;
    const tutor = await Tutor.findOne({ email }).select("+password");
    if (!tutor) {
        return res.status(404).json({ error: true, code: 404, message: "Invalid email or password" });
    }
    if (!password || !tutor.password) {
        return res.status(400).json({ error: true, code: 400, message: "Invalid email or password" });
    }
    const passwordValid = await bcrypt_1.default.compare(password, tutor.password);
    if (!passwordValid) {
        return res.status(401).json({ error: true, code: 401, message: "Invalid email or password" });
    }
    const secret = `${process.env.JWT_SECRET}`;
    const token = jsonwebtoken_1.default.sign({ id: tutor._id }, secret, { expiresIn: process.env.JWT_EXPIRATION });
    return res.status(200).json({ access_token: token });
};
module.exports = {
    login,
};
