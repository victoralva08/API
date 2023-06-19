const sqlite3 = require('sqlite3') // Here we'll be importing both SQL drivers to be used in the application. 
const sqlite = require('sqlite')

const path = require('path')

async function sqliteConnect() { // this function must be async, because we're dealing with the database connection. 

    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnect