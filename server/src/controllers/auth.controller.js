import { signUpServices } from '../services/auth.services.js';

export const signUpController = async (req, res) => {
    try {
        const userData = req.body;

        const result = await signUpServices(userData);

        res.status(201).json({
            message: 'User registered successfully',
            data: result,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};
