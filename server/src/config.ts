import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.APP_PORT,
}

export default config;
