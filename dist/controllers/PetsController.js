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
class PetsController {
}
_a = PetsController;
PetsController.findPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield Pets.find({});
        return res.status(200).json({ pets });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
PetsController.findPetId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pets = yield Pets.findById(id);
        if (!pets) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No pet with id ${id}` });
        }
        return res.status(200).json(pets);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
PetsController.createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorId } = req.params;
        const tutor = yield Tutors.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: `No tutor with id ${tutorId}`,
            });
        }
        const { name, species, carry, weight, date_of_birth } = req.body;
        const errors = [];
        if (!name) {
            errors.push({ name: "error", message: "Not informed the name" });
        }
        if (!species) {
            errors.push({ species: "error", message: "Not informed the species" });
        }
        if (!carry) {
            errors.push({ carry: "error", message: "Not informed the carry" });
        }
        if (!weight) {
            errors.push({ weight: "error", message: "Not informed the weight" });
        }
        if (!date_of_birth) {
            errors.push({
                date_of_birth: "error",
                message: "Not informed the date of birth",
            });
        }
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const savePet = new Pets({
            name,
            species,
            carry,
            weight,
            date_of_birth,
        });
        const newPet = yield savePet.save();
        const tutorAtualizado = yield Tutors.findByIdAndUpdate(tutorId, { $push: { pets: newPet } }, { new: true });
        if (!tutorAtualizado) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `error updating tutor with id ${tutorId}` });
        }
        return res.status(201).json(newPet);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
PetsController.updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, tutorId } = req.params;
        const { name, species, carry, weight, date_of_birth } = req.body;
        const tutor = yield Tutors.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: `No tutor with id ${tutorId}`,
            });
        }
        const pets = yield Pets.findById(petId);
        if (!pets) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No pet with id ${petId}` });
        }
        const errors = [];
        if (!name) {
            errors.push({ name: "error", message: "Not informed the name" });
        }
        if (!species) {
            errors.push({ species: "error", message: "Not informed the species" });
        }
        if (!carry) {
            errors.push({ carry: "error", message: "Not informed the carry" });
        }
        if (!weight) {
            errors.push({ weight: "error", message: "Not informed the weight" });
        }
        if (!date_of_birth) {
            errors.push({
                date_of_birth: "error",
                message: "Not informed the date of birth",
            });
        }
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const updatePet = yield Pets.findByIdAndUpdate(petId, {
            name,
            species,
            carry,
            weight,
            date_of_birth,
        }, { new: true });
        if (!updatePet) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: `error updating pet with id ${tutorId}`,
            });
        }
        return res.status(200).json(updatePet);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
PetsController.deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, tutorId } = req.params;
        const tutor = yield Tutors.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: `No tutor with id ${tutorId}`,
            });
        }
        const tutorAtualizado = yield Tutors.findByIdAndUpdate(tutorId, { $pull: { pets: petId } }, { new: true });
        if (!tutorAtualizado) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `error updating tutor with id ${tutorId}` });
        }
        const petRemovido = yield Pets.findByIdAndRemove(petId);
        if (!petRemovido) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: `No pet with id ${petId}` });
        }
        return res.status(200).json({
            message: `status code 204 / Pet with id:${petId} , from tutor with id:${tutorId}, was success deleted`,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Internal server error" });
    }
});
exports.default = PetsController;
