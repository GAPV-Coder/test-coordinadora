import User from '../models/user.model.js';
import HandlerError from '../utils/handlerError.js';
import { comparePassword, encryptPassword } from '../utils/encryption.js';
import config from '../config.js';
import jwt from 'jsonwebtoken';

const { jwtSecretKey } = config;

export const signUpServices = async (userData) => {
    try {
        const { name, last_name, email, password, phone_number } = userData;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new HandlerError('User with this email already exists', 400);
        }

        const hashedPassword = await encryptPassword(password);

        const newUser = await User.create({
            name,
            last_name,
            email,
            password: hashedPassword,
            phone_number,
        });

        const { password: _, ...userWithoutPassword } = newUser.dataValues;

        return userWithoutPassword;
    } catch (error) {
        throw new HandlerError(
            `Error registering user: ${error.message}`,
            500,
            error,
        );
    }
};

export const signInServices = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new HandlerError('Email not found', 404);
        }

        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) {
            throw new HandlerError('Invalid credentials', 401);
        }

        const token = jwt.sign({ userId: user.user_id }, jwtSecretKey);

        return {
            user: {
                id: user.user_id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
            },
            token,
        };
    } catch (error) {
        throw new HandlerError(`Sign in failed: ${error.message}`, 500, error);
    }
};
