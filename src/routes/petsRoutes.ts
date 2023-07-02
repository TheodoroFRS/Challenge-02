import express from "express";
import PetsController from "../controllers/PetsController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

/**
 * @swagger
 * tags:
 *   name: Pet
 *   description: Rotas relacionadas aos pets  
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         species:
 *           type: string
 *         carry:
 *           type: string
 *         weight:
 *           type: number
 *         date_of_birth:
 *           type: date
 *       required:
 *         - nome
 *         - species
 *         - carry
 *         - weight
 *         - date_of_birth
 */

/**
 * @swagger
 * tags:
 *   name: Pet
 *   description: Rotas relacionadas aos pets
 * /pets:
 *   get:
 *     summary: Lista todos os pets
 *     tags: [Pet]
 *     responses:
 *       200:
 *         description: Lista de pets
 *       401:
 *         description: Authentication Invalid, not authorized 
 *       404:
 *         description: Pets not found
 *       500:
 *         description: Internal server error
 * /pets/{id}:
 *   post:
 *     summary: Cadastra um novo pet no tutor
 *     tags: [Pet]
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
 *             $ref: '#/components/schemas/Pet'
 *           example:
 *             name: "lilo"
 *             species: "dog"
 *             carry: "p"
 *             weight: 5
 *             date_of_birth: "1993-12-12 10:10"
 *     responses:
 *       201:
 *         description: pet cadastrado com sucesso
 *       400:
 *         description: Not informed
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id  
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Obtém um pet pelo ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: pet encontrado
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id || No pet with id
 *       500:
 *         description: Internal server error
 * /pets/{petId}/tutor/{tutorId}:
 *   put:
 *     summary: Atualiza o pet do tutor pelo petId e tutorId 
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pet
 *       - in: path
 *         name: tutorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *           example:
 *             name: "stitch"
 *             species: "cat"
 *             carry: "m"
 *             weight: 6
 *             date_of_birth: "1993-12-12 10:10"
 *     responses:
 *       200:
 *         description: pet atualizado
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id || No pet with id
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Deleta o pet do tutor pelo petId e tutorId 
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pet
 *       - in: path
 *         name: tutorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     responses:
 *       200:
 *         description: Pet with id:${petId} , from tutor with id:${tutorId}, was success deleted
 *       401:
 *         description: Authentication Invalid, not authorized
 *       404:
 *         description: No tutor with id || No pet with id
 *       500:
 *         description: Internal server error
 */

const router = express.Router();

router
  .get("/pets",AuthMiddleware, PetsController.findPets)
  .get("/pets/:id",AuthMiddleware, PetsController.findPetId)

  .post("/pets/:tutorId",AuthMiddleware, PetsController.createPet)
  .put("/pets/:petId/tutor/:tutorId",AuthMiddleware, PetsController.updatePet)
  .delete("/pets/:petId/tutor/:tutorId",AuthMiddleware,PetsController.deletePet)

export default router;
