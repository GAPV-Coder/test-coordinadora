import { getAllEventsController } from '../../controllers/event.controllers.js';
import { getAllEventsService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test getAllEventsController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all events successfully', async () => {
        const events = [
            { id: '1', name: 'Event 1' },
            { id: '2', name: 'Event 2' },
        ];
        getAllEventsService.mockResolvedValueOnce(events);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllEventsController(req, res);

        expect(getAllEventsService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Successful events',
            data: events,
        });
    });

    test('should handle error when getting all events', async () => {
        const error = new Error('Failed to get events');
        error.statusCode = 500;

        getAllEventsService.mockRejectedValueOnce(error);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllEventsController(req, res);

        expect(getAllEventsService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Failed to get events',
        });
    });
});
