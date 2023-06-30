import express from "express";
import TutorController from "../controllers/TutorController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router
  .get("/tutors",AuthMiddleware, TutorController.findTutors)
  .get("/tutors/:id",AuthMiddleware, TutorController.findTutorId)
  .post("/tutors", TutorController.createTutor)
  .put("/tutors/:id",AuthMiddleware, TutorController.updateTutor)
  .delete("/tutors/:id",AuthMiddleware, TutorController.deleteTutor)
 
export default router;

