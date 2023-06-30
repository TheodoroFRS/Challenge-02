"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connectDB = require('./config/dbConect');
(0, index_1.default)(app);
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => console.log(`Server is listening on port http://localhost:${port} ...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
exports.default = app;
