import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router) => {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "example@gmail.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *               username:
   *                 type: string
   *                 example: "exampleUser"
   *     responses:
   *       200:
   *         description: User successfully registered
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *       400:
   *         description: Bad request (e.g., missing or invalid fields, user already exists)
   */
  router.post("/auth/register", register);

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Login an existing user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "example@gmail.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: User successfully logged in
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *       400:
   *         description: Bad request (e.g., missing or invalid fields)
   *       403:
   *         description: Forbidden (e.g., invalid password)
   */
  router.post("/auth/login", login);
};
