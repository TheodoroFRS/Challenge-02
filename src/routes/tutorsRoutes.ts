import express from "express";
import TutorController from "../controllers/TutorController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

/**
 * @swagger
 * tags:
 *   name: Tutor
 *   description: Rotas relacionadas aos tutores  
 * components:
 *   schemas:
 *     Tutor:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         date_of_birth:
 *           type: date
 *         zip_code:
 *           type: number
 *         pets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *       required:
 *         - nome
 *         - password
 *         - phone
 *         - email
 *         - date_of_birth
 *         - zip_code
 */

/**
 * @swagger
 * tags:
 *   name: Tutor
 *   description: Rotas relacionadas aos tutores
 * /tutors:
 *   get:
 *     summary: Lista todos os tutores
 *     tags: [Tutor]
 *     responses:
 *       200:
 *         description: Lista de tutores
 *       401:
 *         description: Authentication Invalid, not authorized 
 *       404:
 *         description: Tutors not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Cadastra um novo tutor
 *     tags: [Tutor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutor'
 *           example:
 *             name: "Theo"
 *             password: "secret"
 *             phone: "40028922"
 *             email: "Theo.doro@compasso.com"
 *             date_of_birth: "2023-12-12 10: 10"
 *             zip_code: 12345678
 *     responses:
 *       201:
 *         description: tutor cadastrado com sucesso
 *       400:
 *         description: Not informed 
 *       500:
 *         description: Internal server error
 * /tutors/{id}:
 *   get:
 *     summary: Obtém um tutor pelo ID
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     responses:
 *       200:
 *         description: tutor encontrado
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Atualiza um tutor pelo ID
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutor'
 *           example:
 *             name: "Theodoro"
 *             phone: "40028922"
 *             email: "Theo.doro@compasso.com"
 *             date_of_birth: "2023-12-12 10: 10"
 *             zip_code: 12345678
 *     responses:
 *       200:
 *         description: tutor atualizado
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Deleta um tutor pelo ID
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     responses:
 *       200:
 *         description: status code 204 / Tutor was success deleted
 *       401:
 *         description: Authentication Invalid, not authorized
 *       403:
 *         description: It is not possible to delete the tutor with one or more pets associated with it.
 *       404:
 *         description: No tutor with id
 *       500:
 *         description: Internal server error
 */

const router = express.Router();

router
  .get("/tutors",AuthMiddleware, TutorController.findTutors)
  .get("/tutors/:id",AuthMiddleware, TutorController.findTutorId)
  .post("/tutors", TutorController.createTutor)
  .put("/tutors/:id",AuthMiddleware, TutorController.updateTutor)
  .delete("/tutors/:id",AuthMiddleware, TutorController.deleteTutor)
 
export default router;

