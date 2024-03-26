import {
    getAllUsersServices, 
    getUserServices,
    updateUserServices,
    deleteUserServices,
} from '../services/user.services.js';

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersServices();
        res.status(200).json({
            message: 'Successfully obtained users',
            data: users
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const getUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserServices(userId);

        res.status(200).json({
            message: 'Successful user',
            data: user
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const updatedUser = await updateUserServices(userId, userData);

        res.status(200).json({
            message: 'User successfully updated',
            data: updatedUser
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await deleteUserServices(userId);
        res.status(200).json({
            message: 'User has been deleted',
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};
