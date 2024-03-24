import User from '../models/user.model.js';
import HandlerError from '../utils/handlerError.js';

export const getAllUsersServices = async () => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        return users;
    } catch (error) {
        throw new HandlerError(
            `Error getting all users: ${error.message}`,
            500,
            error,
        );
    }
};

export const getUserServices = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            throw new HandlerError('User not found', 404);
        }

        return user;
    } catch (error) {
        throw new HandlerError(
            `Error getting user: ${error.message}`,
            500,
            error,
        );
    }
};

export const updateUserServices = async (userId, userData) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new HandlerError('User not found', 404);
        }

        delete userData.password;

        await user.update(userData);

        const { password: _, ...infoUser } = user.dataValues;

        return infoUser;
    } catch (error) {
        throw new HandlerError(
            `Error updating user: ${error.message}`,
            500,
            error,
        );
    }
};

export const deleteUserServices = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new HandlerError('User not found', 404);
        }

        await user.destroy();

        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new HandlerError(
            `Error deleting user: ${error.message}`,
            500,
            error,
        );
    }
};
