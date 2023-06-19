const sqliteConnect = require('../../sqlite')
const createUsers = require('./createUsers.js')

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('')

    sqliteConnect()
    .then(function (db) {db.exec(schemas)})
    .catch(error => console.error(error))
}

module.exports = migrationsRun