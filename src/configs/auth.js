module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRETS || "default",
        expiresIn: "1d"
    }
}