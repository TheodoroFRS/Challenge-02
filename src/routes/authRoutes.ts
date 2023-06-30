import express from "express";
const router = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - "Login"
 *     summary: Realiza o login do tutor
 *     description: Realiza o login do tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *              email: "Theo.doro@compasso.com"
 *              password: "secret"
 *     responses:
 *       200:
 *         description: access_token:token 
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: Invalid email or password
 *       500:
 *         description: Erro interno no servidor
 */
const { login } = require('../controllers/authController');


router.post('/auth', login);

export default router;
