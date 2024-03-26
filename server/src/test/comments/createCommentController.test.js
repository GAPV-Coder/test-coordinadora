import { createCommentController } from '../../controllers/comments.controllers.js';
import { createCommentService } from '../../services/comments.services.js';

jest.mock('../../services/comments.services.js');

describe('Test createCommentController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a comment and return success message', async () => {
        const req = {
            body: {
                comment: 'This is a test comment',
            },
            params: {
                id_event: '1',
                id_user: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockResult = {
            id: '1',
            comment: 'This is a test comment',
            id_event: '1',
            id_user: '1',
        };
        createCommentService.mockResolvedValue(mockResult);

        await createCommentController(req, res);

        expect(createCommentService).toHaveBeenCalledWith({
            comment: 'This is a test comment',
            id_event: '1',
            id_user: '1',
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Comment successfully created',
            data: mockResult,
        });
    });

    test('should return an error if creating comment fails', async () => {
        const req = {
            body: {
                comment: 'This is a test comment',
            },
            params: {
                id_event: '1',
                id_user: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const errorMessage = 'Failed to create comment';
        createCommentService.mockRejectedValue(new Error(errorMessage));

        await createCommentController(req, res);

        expect(createCommentService).toHaveBeenCalledWith({
            comment: 'This is a test comment',
            id_event: '1',
            id_user: '1',
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
