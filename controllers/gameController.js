import gameService from "../services/gameService.js"

class GameController {
    async getGames(req, res) {
        const { name, price, enterprise, id } = req.query
    
        if (req.query) {
            const filter = {name: name, price: price, id: id, enterprise: enterprise}
            const games = await gameService.getGameByFilter(filter)
            return res.status(200).json(games)
        } else {
            const games = await gameService.getAllGames()
            return res.status(200).json(games)     
        }
    }

    async createGame(req, res) {
        const { name, price, enterprise, amount, img } = req.body

        if (!name || !price || !enterprise || !amount || !img) {
            return res.status(400).json({ error: "name, enterprise, price, amount, and image are required" })
        } else {
            const Game = await gameService.addGame({
                name: name,
                price: price ? parseFloat(price) : undefined,
                enterprise: enterprise ? String(enterprise) : undefined,
                amount: amount ? parseInt(amount) : undefined,
                img: img ? String(img) : undefined
            })
            return res.status(201).json(Game)
        }
    }

    async deleteGame(req, res) {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ error: "Game ID is required" })
        } else {
            const deletedGame = await gameService.deleteGame(id)
            return res.status(200).json(deletedGame)
        }
    }

    async updateGame(req, res) {
        const { name, amount, price, enterprise, img } =  req.body

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "Game ID are required" })
        } else {
            const existingGame = await gameService.getGameById(id)

            if (!existingGame) {
                return res.status(404).json({ error: "Game not found" })
            }

            const updateGameInformations = {
                name: name ?? existingGame.name,
                amount: amount !== undefined ? parseInt(amount) : existingGame.amount,
                price: price ?? existingGame.price,
                enterprise: enterprise ?? existingGame.enterprise,
                img: img ?? existingGame.img
            }

            const updateGame = await gameService.updateGame(id, updateGameInformations)

            return res.status(200).json(updateGame)
        }

    }
}

export default new GameController()