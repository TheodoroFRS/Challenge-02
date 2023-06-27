"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PetsController_1 = __importDefault(require("../controllers/PetsController"));
const router = express_1.default.Router();
router
    .post("/pets/:tutorId", PetsController_1.default.createPet)
    .put("/pets/:petId/tutor/:tutorId", PetsController_1.default.updatePet)
    .delete("/pets/:petId/tutor/:tutorId", PetsController_1.default.deletePet);
exports.default = router;
