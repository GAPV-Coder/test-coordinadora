import { signUpController } from '../../controllers/auth.controller.js';
import { signUpServices } from '../../services/auth.services.js';

jest.mock('../../services/auth.services.js');

describe('Test signUpController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password',
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        signUpServices.mockResolvedValueOnce({
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
        });

        await signUpController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully',
            data: { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        });
    });

    it('should handle errors during user registration', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password',
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const error = new Error('An ocurred error');

        signUpServices.mockRejectedValueOnce(error);

        await signUpController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An ocurred error' });
    });
});
