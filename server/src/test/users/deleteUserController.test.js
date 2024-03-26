import { deleteUserController } from '../../controllers/user.controllers.js';
import { deleteUserServices } from '../../services/user.services.js';

jest.mock('../../services/user.services.js');

describe('Test deleteUserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should delete user successfully', async () => {
        const userId = '12345';
        const req = { params: { id: userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        deleteUserServices.mockResolvedValueOnce();

        await deleteUserController(req, res);

        expect(deleteUserServices).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User has been deleted',
        });
    });

    test('should handle error when deleting user', async () => {
        const userId = '12345';
        const req = { params: { id: userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Failed to delete user');
        error.statusCode = 500;

        deleteUserServices.mockRejectedValueOnce(error);

        await deleteUserController(req, res);

        expect(deleteUserServices).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Failed to delete user',
        });
    });
});
