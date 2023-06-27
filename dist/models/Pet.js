"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PetSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 3,
    },
    species: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    },
    carry: {
        type: String,
        enum: ['p', 'm', 'g'],
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    }
});
module.exports = mongoose_1.default.model("Pet", PetSchema);
