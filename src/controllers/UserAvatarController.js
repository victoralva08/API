const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../PROVIDERS/DiskStorage")

class UserAvatarController {

    async update(request, response) {
        const user_id = request.user.id
        const avatarFileName = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await knex('users')
        .where({ id: user_id }).first()

        if (!user) {
            throw new AppError("User not found.", 401)
        }

        if (user.avatar) {
            await new DiskStorage().deleteFile(user.avatar)
        }

        const filename = await new DiskStorage().saveFile(avatarFileName)
        user.avatar = filename

        await knex('users')
        .update(user)
        .where({ id: user_id })

        return response.json(user)

    }


}

module.exports = UserAvatarController