import { createEventController } from '../../controllers/event.controllers.js';
import { createEventService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test createEventController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create event successfully', async () => {
        const userId = '12345';
        const eventData = {
            event_name: 'Test Event',
            description: 'Test Description',
        };
        const req = { userData: { userId }, body: eventData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createEventService.mockResolvedValueOnce({ id: '67890', ...eventData });

        await createEventController(req, res);

        expect(createEventService).toHaveBeenCalledWith(eventData, userId);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Event created successfully',
            data: { id: '67890', ...eventData },
        });
    });

    test('should handle error when creating event', async () => {
        const userId = '12345';
        const eventData = {
            event_name: 'Test Event',
            description: 'Test Description',
        };
        const req = { userData: { userId }, body: eventData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Failed to create event');
        error.statusCode = 500;

        createEventService.mockRejectedValueOnce(error);

        await createEventController(req, res);

        expect(createEventService).toHaveBeenCalledWith(eventData, userId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Failed to create event',
        });
    });

    test('should handle missing user ID', async () => {
        const eventData = {
            event_name: 'Test Event',
            description: 'Test Description',
        };
        const req = { userData: {}, body: eventData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await createEventController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID is missing' });
    });
});
