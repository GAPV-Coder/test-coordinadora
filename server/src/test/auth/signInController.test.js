import { signInController } from '../../controllers/auth.controller';
import { signInServices } from '../../services/auth.services';

jest.mock('../../services/auth.services.js');

describe('Test signInController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sign in user and return token', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const user = {
            name: 'Test User',
        };
        const token = 'mocked-token';

        signInServices.mockResolvedValueOnce({ user, token });

        await signInController(req, res);

        expect(signInServices).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledWith(
            'access_token',
            'mocked-token',
            {
                httpOnly: true,
            },
        );
        expect(res.json).toHaveBeenCalledWith({
            message: 'Welcome back Test User!',
            data: user,
        });
    });

    test('should handle sign in error', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Invalid credentials');
        error.statusCode = 401;

        signInServices.mockRejectedValueOnce(error);

        await signInController(req, res);

        expect(signInServices).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
        );
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
});
