import { updateUserController } from '../../controllers/user.controllers.js';
import { updateUserServices } from '../../services/user.services.js';

jest.mock('../../services/user.services.js');

describe('Test updateUserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should update user successfully', async () => {
        const userId = '12345';
        const userData = { name: 'Updated User' };
        const req = { params: { id: userId }, body: userData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const updatedUser = { id: userId, ...userData };

        updateUserServices.mockResolvedValueOnce(updatedUser);

        await updateUserController(req, res);

        expect(updateUserServices).toHaveBeenCalledWith(userId, userData);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User successfully updated',
            data: updatedUser,
        });
    });

    test('should handle error when updating user', async () => {
        const userId = '12345';
        const userData = { name: 'Updated User' };
        const req = { params: { id: userId }, body: userData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Failed to update user');
        error.statusCode = 500;

        updateUserServices.mockRejectedValueOnce(error);

        await updateUserController(req, res);

        expect(updateUserServices).toHaveBeenCalledWith(userId, userData);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Failed to update user',
        });
    });
});
