import { deleteCommentController } from '../../controllers/comments.controllers.js';
import { deleteCommentService } from '../../services/comments.services.js';

jest.mock('../../services/comments.services.js');

describe('Test deleteCommentController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should delete a comment and return success message', async () => {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        deleteCommentService.mockResolvedValue();

        await deleteCommentController(req, res);

        expect(deleteCommentService).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Comment deleted successfully',
        });
    });

    test('should return an error if deleting comment fails', async () => {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const errorMessage = 'Failed to delete comment';
        deleteCommentService.mockRejectedValue(new Error(errorMessage));

        await deleteCommentController(req, res);

        expect(deleteCommentService).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
