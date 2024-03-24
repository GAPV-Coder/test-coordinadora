import {
    createEventService,
    getAllEventsService,
    getEventByIdService,
    updateEventService,
    deleteEventService,
} from '../services/event.services.js';

export const createEventController = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await createEventService(eventData);

        res.status(201).json({
            message: 'Event created successfully',
            data: newEvent,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const getAllEventsController = async (req, res) => {
    try {
        const events = await getAllEventsService();

        res.status(201).json({
            message: 'Successful events',
            data: events,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const getEventByIdController = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await getEventByIdService(eventId);

        res.status(201).json({
            message: 'Successful event',
            data: event,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const updateEventController = async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const updatedEvent = await updateEventService(eventId, eventData);

        res.status(201).json({
            message: 'Event successfully updated',
            data: updatedEvent,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const deleteEventController = async (req, res) => {
    try {
        const eventId = req.params.id;
        const result = await deleteEventService(eventId);

        res.status(201).json({ message: 'Event successfully deleted' });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};
