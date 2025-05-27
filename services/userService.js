import prisma from '../prisma/prismaClient.js'

class UserService {
    async getAllUsers() {
        return await prisma.user.findMany()
    }

    async getUserByFilter(filters) {
        return await prisma.user.findMany({
            where: filters
        })
    }

    async addUser(userData) {
        return await prisma.user.create({
            data: userData
        })
    }

    async deleteUser(userId) {
        return await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }

    async updateUser(userId, userData) {
        return await prisma.user.update({
            where: {
                id: userId
            },

            data: userData
        })
    }

    async getUserById(UserId) {
        return await prisma.user.findUnique({
            where: {
                id: UserId
            }
        })
    }
}

export default new UserService()
