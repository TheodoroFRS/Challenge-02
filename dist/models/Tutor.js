"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcrypt');
const SinglePetSchema = new mongoose_1.default.Schema({
    petId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true,
    },
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
const TutorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 3,
    },
    password: { type: String, required: true, minlength: 6 },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    pets: [SinglePetSchema],
});
TutorSchema.pre("save", async function () {
    //   // console.log(this.modifiedPaths());
    //   // console.log(this.isModified('name'));
    //   if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
TutorSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};
module.exports = mongoose_1.default.model("Tutor", TutorSchema);
