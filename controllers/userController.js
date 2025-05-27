import userService from "../services/userService.js"

class UserController {
    async getUsers(req, res) {
        const { name, email, id } = req.query

        if (req.query) {
            const filter = {name: name, email: email, id: id}
            const users = await userService.getUserByFilter(filter)
            return res.status(200).json(users) 
        } else {
            const users = await userService.getAllUsers()
            return res.status(200).json(users)
        }
    }

    async createUser(req, res) {
        const { name, email, games, age } = req.body

        if (!name || !email || !games) {
            return res.status(400).json({ error: "name, email, and games are required" })
        } else {
            const user = await userService.addUser({
                name: name,
                email: email ? String(email) : undefined,
                games: games,
                age: age ? parseInt(age) : undefined
            })
            return res.status(201).json(user)
        }
    }

    async deleteUser(req, res) {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ error: "User ID is required" })
        } else {
            const deletedUser = await userService.deleteUser(id)
            return res.status(200).json(deletedUser)
        }
    }

    async updateUser(req, res) {
        const { name, age, email, games } =  req.body

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "User ID are required" })
        } else {
            const existingUser = await userService.getUserById(id)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" })
            }

            const updateUserInformations = {
                name: name ?? existingUser.name,
                age: age !== undefined ? parseInt(age) : existingUser.age,
                email: email ?? existingUser.email,
                games: games ?? existingUser.games
            }

            const updateUser = await userService.updateUser(id, updateUserInformations)

            return res.status(200).json(updateUser)
        }

    }
}

export default new UserController()
