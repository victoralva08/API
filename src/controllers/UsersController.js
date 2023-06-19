const AppError = require('../utils/AppError.js') // Here we're importing the AppError class to apply it to the main app.
const sqliteConnect = require('../database/sqlite/index.js')
const { hash, compare } = require('bcryptjs') // hash is the function for generating the password cypher



class UsersController { // the usage of a class is for creating and accessing various functions inside of it

    /* A controller can have 5 function/methods max:

    1. index - GET for listing registers.
    2. show - GET for exhibiting an specific user.
    3. create - POST for creating a register.
    4. update - PUT for updating a register.
    5. delete - DELETE for removing a register.

    if more than 5 methos are still needed, it's suggested to create a new controller file.
    it is also possible that a controller has less than 5 methods, but never more than 5.
    */

    async create(request, response){ // it is not needed to specify that this is a function, because it is inside a class, which automatically recognizes it

        const { name, email, password } = request.body
        
        const database = await sqliteConnect()

        const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', (email))
        if (checkUserExist){
            throw new AppError('This email is already being used.')
        }

        const hashedPassword = await hash(password, 8)

        await database.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword])

        return response.status(201).json()
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnect()
        const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id])

        if (!user){
            throw new AppError("Usuário não encontrado.")
        }

        const userWithUpdatedEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError('Este email já está cadastrado.')
        }

        
        user.name = name ?? user.name // nullage operator
        user.email = email ?? user.email

        if( password && !old_password ){
            throw new AppError('Por favor, informe a senha antiga.')
        }

        if ( password && old_password ){
            const checkOldPassword = await compare(old_password, user.password)  

            if (!checkOldPassword){
                throw new AppError("A senha antiga está incorreta.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id])

            return response.status(200).json()
    }
}

module.exports = UsersController