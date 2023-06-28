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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Tutors = require("../models/Tutor");
const Pets = require("../models/Pet");
class TutorController {
}
_a = TutorController;
TutorController.findTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutors = yield Tutors.find({});
        return res.status(200).json({ tutors });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.findTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutor = yield Tutors.findById(id);
        if (!tutor) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No tutor with id ${id}` });
        }
        return res.status(200).json(tutor);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.createTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, date_of_birth, zip_code } = req.body;
        const erros = [];
        if (!name) {
            erros.push({ name: "error", message: "Not informed the name" });
        }
        if (!phone) {
            erros.push({ phone: "error", message: "Not informed the phone" });
        }
        if (!email) {
            erros.push({ email: "error", message: "Not informed the email" });
        }
        if (!date_of_birth) {
            erros.push({
                email: "error",
                message: "Not informed the date of birth",
            });
        }
        if (!zip_code) {
            erros.push({ zip_code: "error", message: "Not informed the zip code" });
        }
        if (erros.length > 0) {
            return res.status(400).json(erros);
        }
        if (yield Tutors.findOne({ email })) {
            return res
                .status(400)
                .json({ error: true, code: 400, message: "already existing email" });
        }
        const tutorSave = new Tutors({
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
        });
        const newTutor = yield tutorSave.save();
        return res.status(201).json(newTutor);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.updateTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, phone, email, date_of_birth, zip_code } = req.body;
        const erros = [];
        if (!name) {
            erros.push({ name: "error", message: "Not informed the name" });
        }
        if (!phone) {
            erros.push({ phone: "error", message: "Not informed the phone" });
        }
        if (!email) {
            erros.push({ email: "error", message: "Not informed the email" });
        }
        if (!date_of_birth) {
            erros.push({
                email: "error",
                message: "Not informed the date of birth",
            });
        }
        if (!zip_code) {
            erros.push({ zip_code: "error", message: "Not informed the zip code" });
        }
        if (erros.length > 0) {
            return res.status(400).json(erros);
        }
        const updateTutor = yield Tutors.findByIdAndUpdate(id, {
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
        }, { new: true });
        if (!updateTutor) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No tutor with id ${id}` });
        }
        return res.status(200).json(updateTutor);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.deleteTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutorRemovido = yield Tutors.findByIdAndRemove(id);
        if (!tutorRemovido) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No tutor with id ${id}` });
        }
        return res
            .status(200)
            .json({
            message: `status code 204 / Tutor with id:${id} was success deleted`,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.addPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //return await PermisMiddleware(req, res, async () => {
        const { id } = req.params;
        const updateData = req.body;
        const pet = yield Pets.findById(updateData.pets);
        if (!pet) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No pet with id ${updateData.pets}` });
        }
        const tutorAtualizado = yield Tutors.findByIdAndUpdate(id, { $push: { pets: updateData.pets } }, { new: true });
        if (!tutorAtualizado) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No tutor with id ${id}` });
        }
        return res.status(200).json(tutorAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
TutorController.removepet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //return await PermisMiddleware(req, res, async () => {
        console.log("0");
        const { petId, tutorId } = req.params;
        console.log("1");
        const pet = yield Pets.findById(petId);
        if (!pet) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No pet with id ${petId}` });
        }
        console.log("2");
        const tutorAtualizado = yield Tutors.findByIdAndUpdate(tutorId, { $pull: { pets: petId } }, { new: true });
        console.log("3");
        if (!tutorAtualizado) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No tutor with id ${tutorId}` });
        }
        console.log("4");
        return res.status(200).json(tutorAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
exports.default = TutorController;
