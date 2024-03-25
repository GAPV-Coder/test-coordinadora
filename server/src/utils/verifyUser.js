import jwt from 'jsonwebtoken';
import config from '../config.js';
import HandlerError from './handlerError.js';

const { jwtSecretKey } = config;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(HandlerError(401, 'Unauthorized'));
    }

    jwt.verify(token, jwtSecretKey, (error, user) => {
        if (error) {
            return next(HandlerError(401, 'Unauthorized'));
        }

        req.user = user;
        next();
    });
};