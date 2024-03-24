import User from '../models/user.model.js';
import HandlerError from '../utils/handlerError.js';
import { encryptPassword } from '../utils/encryption.js';

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
