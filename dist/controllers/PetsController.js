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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bdjson_1 = __importDefault(require("../bdjson/bdjson"));
class PetsController {
}
_a = PetsController;
PetsController.createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorId } = req.params;
        const tutor = bdjson_1.default.findTutorId(tutorId);
        if (!tutor) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        const { name, species, carry, weight, date_of_birth } = req.body;
        const errors = [];
        if (!name) {
            errors.push({ name: "error", message: "Nome não informado" });
        }
        if (!species) {
            errors.push({ species: "error", message: "Espécie não informada" });
        }
        if (!carry) {
            errors.push({ carry: "error", message: "Porte não informada" });
        }
        if (!weight) {
            errors.push({ weight: "error", message: "Peso não informado" });
        }
        if (!date_of_birth) {
            errors.push({ date_of_birth: "error", message: "Data de nascimento não informada" });
        }
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const newPet = {
            id: bdjson_1.default.minhaListaPet(tutorId) + 1,
            name: name,
            species: species,
            carry: carry,
            weight: weight,
            date_of_birth: date_of_birth,
        };
        bdjson_1.default.createPet(tutorId, newPet);
        return res.status(201).json(newPet);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
PetsController.updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, tutorId } = req.params; // o petId vem como string do corpo da requisição
        const petIdNumber = parseInt(petId); // fazendo isso corverto o "petId" para petIdNumber
        const { name, species, carry, weight, date_of_birth } = req.body;
        const tutor = bdjson_1.default.findTutorId(tutorId);
        if (!tutor) {
            return res
                .status(404)
                .json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        const pet = bdjson_1.default.findPetId(tutorId, petId);
        if (!pet) {
            return res.status(404).json({ error: true, code: 404, message: "Pet não encontrado" });
        }
        const errors = [];
        if (!name) {
            errors.push({ name: "error", message: "Nome não informado" });
        }
        if (!species) {
            errors.push({ species: "error", message: "Espécie não informada" });
        }
        if (!carry) {
            errors.push({ carry: "error", message: "Raça não informada" });
        }
        if (!weight) {
            errors.push({ weight: "error", message: "Peso não informado" });
        }
        if (!date_of_birth) {
            errors.push({ date_of_birth: "error", message: "Data de nascimento não informada" });
        }
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const updatePet = {
            id: petIdNumber,
            name: name,
            species: species,
            carry: carry,
            weight: weight,
            date_of_birth: date_of_birth,
        };
        bdjson_1.default.updatePet(tutorId, petId, updatePet);
        return res.status(200).json(updatePet);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
PetsController.deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, tutorId } = req.params;
        const tutor = bdjson_1.default.findTutorId(tutorId);
        if (!tutor) {
            return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        const pet = bdjson_1.default.findPetId(tutorId, petId);
        if (!pet) {
            return res.status(404).json({ error: true, code: 404, message: "Pet não encontrado" });
        }
        bdjson_1.default.deletePet(tutorId, petId);
        return res.status(200).json({ message: `Pet id:${petId} do tutor id:${tutorId} foi deletado com sucesso` });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
exports.default = PetsController;
