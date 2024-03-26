import { getAllUsersController } from '../../controllers/user.controllers.js';
import { getAllUsersServices } from '../../services/user.services.js';

jest.mock('../../services/user.services.js');

describe('Test getAllUsersController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all users successfully', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const users = [{ name: 'User 1' }, { name: 'User 2' }];

        getAllUsersServices.mockResolvedValueOnce(users);

        await getAllUsersController(req, res);

        expect(getAllUsersServices).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Successfully obtained users',
            data: users,
        });
    });

    test('should handle error when getting all users', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Failed to get users');
        error.statusCode = 500;

        getAllUsersServices.mockRejectedValueOnce(error);

        await getAllUsersController(req, res);

        expect(getAllUsersServices).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get users' });
    });
});
