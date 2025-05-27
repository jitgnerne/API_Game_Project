import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router()

router.get("/users", (req, res) => userController.getUsers(req, res))
router.post("/users", (req, res) => userController.createUser(req, res))
router.put("/users/:id", (req, res) => userController.updateUser(req, res))
router.delete("/users", (req, res) => userController.deleteUser(req, res))

export default router
