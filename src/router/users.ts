import express from "express";

import { deleteUser, getAllUsers } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retrieve a list of all users
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   username:
   *                     type: string
   */
  router.get("/users", getAllUsers);

  router.get("/users", isAuthenticated, getAllUsers);

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User successfully deleted
   *       400:
   *         description: Bad request
   */
  router.get("/users/:id", isAuthenticated, isOwner, deleteUser);

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user's username by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *       - in: body
   *         name: username
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *         required: true
   *         description: The new username
   *     responses:
   *       200:
   *         description: User successfully updated
   *       400:
   *         description: Bad request
   */
  // router.put("/users/:id", updateUser);
};
