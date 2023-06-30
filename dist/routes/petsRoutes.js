"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PetsController_1 = __importDefault(require("../controllers/PetsController"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = express_1.default.Router();
router
    .get("/pets", AuthMiddleware_1.default, PetsController_1.default.findPets)
    .get("/pets/:id", AuthMiddleware_1.default, PetsController_1.default.findPetId)
    .post("/pets/:tutorId", AuthMiddleware_1.default, PetsController_1.default.createPet)
    .put("/pets/:petId/tutor/:tutorId", AuthMiddleware_1.default, PetsController_1.default.updatePet)
    .delete("/pets/:petId/tutor/:tutorId", AuthMiddleware_1.default, PetsController_1.default.deletePet);
exports.default = router;
