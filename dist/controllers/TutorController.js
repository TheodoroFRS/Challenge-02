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
class TutorController {
}
_a = TutorController;
TutorController.findTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(bdjson_1.default.findTutors());
});
TutorController.findTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutor = bdjson_1.default.findTutorId(id);
        if (!tutor) {
            return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        return res.status(200).json(tutor);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
TutorController.createTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, date_of_birth, zip_code } = req.body;
        const erros = [];
        if (!name) {
            erros.push({ name: "error", message: "Nome não informado" });
        }
        if (!phone) {
            erros.push({ phone: "error", message: "Telefone não informado" });
        }
        if (!email) {
            erros.push({ email: "error", message: "Email não informado" });
        }
        if (!date_of_birth) {
            erros.push({ email: "error", message: "Data de nascimento não informado" });
        }
        if (!zip_code) {
            erros.push({ zip_code: "error", message: "CEP não informado" });
        }
        if (erros.length > 0) {
            return res.status(400).json(erros);
        }
        const newTutor = {
            id: bdjson_1.default.minhaLista() + 1,
            name: name,
            phone: phone,
            email: email,
            date_of_birth: date_of_birth,
            zip_code: zip_code,
            pets: [],
        };
        bdjson_1.default.createTutor(newTutor);
        return res.status(201).json(newTutor);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
TutorController.updateTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, phone, email, date_of_birth, zip_code } = req.body;
        const tutor = bdjson_1.default.findTutorId(id);
        if (!tutor) {
            return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        const erros = [];
        if (!name) {
            erros.push({ name: "error", message: "Nome não informado" });
        }
        if (!phone) {
            erros.push({ phone: "error", message: "Telefone não informado" });
        }
        if (!email) {
            erros.push({ email: "error", message: "Email não informado" });
        }
        if (!date_of_birth) {
            erros.push({ email: "error", message: "Data de nascimento não informado" });
        }
        if (!zip_code) {
            erros.push({ zip_code: "error", message: "CEP não informado" });
        }
        if (erros.length > 0) {
            return res.status(400).json(erros);
        }
        const updateTutor = {
            id: tutor.id,
            name: name,
            phone: phone,
            email: email,
            date_of_birth: date_of_birth,
            zip_code: zip_code,
            pets: tutor.pets,
        };
        bdjson_1.default.updateTutor(id, updateTutor);
        return res.status(200).json(bdjson_1.default.findTutorId(id));
    }
    catch (error) {
        return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
TutorController.deleteTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutor = bdjson_1.default.findTutorId(id);
        if (!tutor) {
            return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
        }
        bdjson_1.default.deleteTutor(id);
        return res.status(200).json({ message: `Tutor id:${id} foi deletado com sucesso` });
    }
    catch (error) {
        return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
});
exports.default = TutorController;
