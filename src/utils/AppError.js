class AppError {
    message
    statusCode

    constructor(message, statusCode = 400){ // the constructor method is automatically loaded when the class is instanced
        this.message = message
        this.statusCode = statusCode
    } 
}

module.exports = AppError