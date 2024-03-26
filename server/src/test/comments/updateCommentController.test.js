import { updateCommentController } from '../../controllers/comments.controllers.js';
import { updateCommentService } from '../../services/comments.services.js';

jest.mock('../../services/comments.services.js');

describe('Test updateCommentController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should update a comment and return success message', async () => {
        const req = {
            params: {
                id: '1',
            },
            body: {
                comment: 'This is an updated comment',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockResult = {
            id: '1',
            comment: 'This is an updated comment',
            id_event: '1',
            id_user: '1',
        };
        updateCommentService.mockResolvedValue(mockResult);

        await updateCommentController(req, res);

        expect(updateCommentService).toHaveBeenCalledWith('1', {
            comment: 'This is an updated comment',
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Comment updated successfully',
            data: mockResult,
        });
    });

    test('should return an error if updating comment fails', async () => {
        const req = {
            params: {
                id: '1',
            },
            body: {
                comment: 'This is an updated comment',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const errorMessage = 'Failed to update comment';
        updateCommentService.mockRejectedValue(new Error(errorMessage));

        await updateCommentController(req, res);

        expect(updateCommentService).toHaveBeenCalledWith('1', {
            comment: 'This is an updated comment',
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
