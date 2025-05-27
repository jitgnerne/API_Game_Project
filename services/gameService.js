import prisma from '../prisma/prismaClient.js'

class GameService {
    async getAllGames() {
        return await prisma.game.findMany()
    }

    async getGameByFilter(filters) {
        return await prisma.game.findMany({
            where: filters
        })
    }

    async addGame(gameData) {
        return await prisma.game.create({
            data: gameData
        })
    }

    async deleteGame(GameId) {
        return await prisma.game.delete({
            where: {
                id: GameId
            }
        })
    }

    async updateGame(GameId, gameData) {
        return await prisma.game.update({
            where: {
                id: GameId
            },

            data: gameData
        })
    }

    async getGameById(GameId) {
        return await prisma.game.findUnique({
            where: {
                id: GameId
            }
        })
    }
}

export default new GameService()
