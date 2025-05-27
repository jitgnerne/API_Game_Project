import express from "express"
import gameController from "../controllers/gameController.js"

const router = express.Router()

router.get("/games", (req, res) => gameController.getGames(req, res))
router.post("/games", (req, res) => gameController.createGame(req, res))
router.put("/games/:id", (req, res) => gameController.updateGame(req, res))
router.delete("/games", (req, res) => gameController.deleteGame(req, res))

export default router