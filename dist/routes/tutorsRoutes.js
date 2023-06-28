"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TutorController_1 = __importDefault(require("../controllers/TutorController"));
const router = express_1.default.Router();
router
    .get("/tutors", TutorController_1.default.findTutors)
    .get("/tutors/:id", TutorController_1.default.findTutorId)
    .post("/tutors", TutorController_1.default.createTutor)
    .put("/tutors/:id", TutorController_1.default.updateTutor)
    .delete("/tutors/:id", TutorController_1.default.deleteTutor)
    .patch('/tutors/pet/:id', TutorController_1.default.addPet)
    .patch('/pets/:petId/tutor/:tutorId', TutorController_1.default.removepet);
exports.default = router;
