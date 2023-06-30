import express from "express";
import PetsController from "../controllers/PetsController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router
  .get("/pets",AuthMiddleware, PetsController.findPets)
  .get("/pets/:id",AuthMiddleware, PetsController.findPetId)

  .post("/pets/:tutorId",AuthMiddleware, PetsController.createPet)
  .put("/pets/:petId/tutor/:tutorId",AuthMiddleware, PetsController.updatePet)
  .delete("/pets/:petId/tutor/:tutorId",AuthMiddleware,PetsController.deletePet)

export default router;
