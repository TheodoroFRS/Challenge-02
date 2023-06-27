import express from "express";
import TutorController from "../controllers/TutorController";

const router = express.Router();

router
  .get("/tutors", TutorController.findTutors)
  .get("/tutors/:id", TutorController.findTutorId)
  .post("/tutors", TutorController.createTutor)
  .put("/tutors/:id", TutorController.updateTutor)
  .delete("/tutors/:id", TutorController.deleteTutor);
export default router;

