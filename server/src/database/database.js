import { Sequelize } from 'sequelize';
import config from '../config.js';

const { dbName, dbUser, dbPassword, dbHost } = config;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    logging: false,
});

export default sequelize;
