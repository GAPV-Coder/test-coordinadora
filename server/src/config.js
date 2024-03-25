import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.APP_PORT,
    dbName: process.env.DB_NAME || 'db',
    dbUser: process.env.DB_USER || 'user',
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT,
    jwtSecretKey: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_TOKEN
}

export default config;
