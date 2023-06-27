import express from "express";
import PetsController from "../controllers/PetsController";

const router = express.Router();

router 
    .post("/pets/:tutorId", PetsController.createPet)
    .put("/pets/:petId/tutor/:tutorId",PetsController.updatePet)
    .delete("/pets/:petId/tutor/:tutorId",PetsController.deletePet)
export default router;
