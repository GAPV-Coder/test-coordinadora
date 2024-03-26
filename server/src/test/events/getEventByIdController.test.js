import { getEventByIdController } from '../../controllers/event.controllers.js';
import { getEventByIdService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test getEventByIdController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get event by id successfully', async () => {
        const eventId = '1';
        const event = { id: '1', name: 'Event 1' };
        getEventByIdService.mockResolvedValueOnce(event);

        const req = { params: { id: eventId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getEventByIdController(req, res);

        expect(getEventByIdService).toHaveBeenCalledWith(eventId);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Successful event',
            data: event,
        });
    });

    test('should handle error when getting event by id', async () => {
        const eventId = '1';
        const error = new Error('Failed to get event');
        error.statusCode = 500;

        getEventByIdService.mockRejectedValueOnce(error);

        const req = { params: { id: eventId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getEventByIdController(req, res);

        expect(getEventByIdService).toHaveBeenCalledWith(eventId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get event' });
    });
});
