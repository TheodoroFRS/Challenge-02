import express from "express";
import PetsController from "../controllers/PetsController";

const router = express.Router();

router
  .get("/pets", PetsController.findPets)
  .get("/pets/:id", PetsController.findPetId)

  .post("/pets/:tutorId", PetsController.createPet)
  .put("/pets/:petId/tutor/:tutorId", PetsController.updatePet)
  .delete("/pets/:petId/tutor/:tutorId",PetsController.deletePet)

export default router;
