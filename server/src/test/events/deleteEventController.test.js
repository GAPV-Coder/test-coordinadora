import { deleteEventController } from '../../controllers/event.controllers.js';
import { deleteEventService } from '../../services/event.services.js';

jest.mock('../../services/event.services.js');

describe('Test deleteEventController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should delete an event and return success message', async () => {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockResult = 'Event successfully deleted';
        deleteEventService.mockResolvedValue();

        await deleteEventController(req, res);

        expect(deleteEventService).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: mockResult });
    });

    test('should return an error if deleting event fails', async () => {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const errorMessage = 'Failed to delete event';
        deleteEventService.mockRejectedValue(new Error(errorMessage));

        await deleteEventController(req, res);

        expect(deleteEventService).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
