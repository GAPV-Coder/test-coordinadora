import { getUserController } from '../../controllers/user.controllers.js';
import { getUserServices } from '../../services/user.services.js';

jest.mock('../../services/user.services.js');

describe('Test getUserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get user by id successfully', async () => {
        const userId = '12345';
        const req = { params: { id: userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const user = { name: 'User 1' };

        getUserServices.mockResolvedValueOnce(user);

        await getUserController(req, res);

        expect(getUserServices).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Successful user',
            data: user,
        });
    });

    test('should handle error when getting user by id', async () => {
        const userId = '12345';
        const req = { params: { id: userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Failed to get user');
        error.statusCode = 500;

        getUserServices.mockRejectedValueOnce(error);

        await getUserController(req, res);

        expect(getUserServices).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get user' });
    });
});
