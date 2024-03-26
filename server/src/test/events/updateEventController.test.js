import { updateEventController } from '../../controllers/event.controllers.js';
import { updateEventService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test updateEventController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should update event successfully', async () => {
        const eventId = '1';
        const eventData = { name: 'Updated Event' };
        const updatedEvent = { id: '1', name: 'Updated Event' };

        updateEventService.mockResolvedValueOnce(updatedEvent);

        const req = { params: { id: eventId }, body: eventData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateEventController(req, res);

        expect(updateEventService).toHaveBeenCalledTimes(1);
        expect(updateEventService).toHaveBeenCalledWith(eventId, eventData);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Event successfully updated',
            data: updatedEvent,
        });
    });

    test('should handle error when updating event', async () => {
        const eventId = '1';
        const eventData = { name: 'Updated Event' };
        const error = new Error('Failed to update event');
        error.statusCode = 500;

        updateEventService.mockRejectedValueOnce(error);

        const req = { params: { id: eventId }, body: eventData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateEventController(req, res);

        expect(updateEventService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Failed to update event',
        });
    });
});
