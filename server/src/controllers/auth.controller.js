import { signInServices, signUpServices } from '../services/auth.services.js';

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

export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await signInServices(email, password);

        res.status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json({
                message: `Welcome back ${user.name}!`,
                data: user,
            });
    } catch (error) {
        return res.status(error.statusCode).json({ error: error.message });
    }
};
