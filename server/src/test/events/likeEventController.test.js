import { likeEventController } from '../../controllers/event.controllers.js';
import { likeEventService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test likeEventController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should like an event and return success message', async () => {
        const req = {
            params: {
                id_event: '1',
                id_user: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockResult = 'Like added successfully';
        likeEventService.mockResolvedValue(mockResult);

        await likeEventController(req, res);

        expect(likeEventService).toHaveBeenCalledWith('1', '1');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Like to successful event',
            data: mockResult,
        });
    });

    test('should return an error if liking event fails', async () => {
        const req = {
            params: {
                id_event: '1',
                id_user: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const errorMessage = 'Failed to like event';
        likeEventService.mockRejectedValue(new Error(errorMessage));

        await likeEventController(req, res);

        expect(likeEventService).toHaveBeenCalledWith('1', '1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
