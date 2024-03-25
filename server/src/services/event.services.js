import Event from '../models/event.model.js';
import HandlerError from '../utils/handlerError.js';

export const createEventService = async (eventData) => {
    try {
        const newEvent = await Event.create(eventData);
        return newEvent;
    } catch (error) {
        throw new HandlerError(
            `Error creating event: ${error.message}`,
            500,
            error,
        );
    }
};

export const getAllEventsService = async () => {
    try {
        const events = await Event.findAll();
        return events;
    } catch (error) {
        throw new HandlerError(
            `Error getting all events: ${error.message}`,
            500,
            error,
        );
    }
};

export const getEventByIdService = async (eventId) => {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new HandlerError('Event not found', 400);
        }

        return event;
    } catch (error) {
        throw new HandlerError(
            `Error getting event: ${error.message}`,
            500,
            error,
        );
    }
};

export const updateEventService = async (eventId, eventData) => {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new HandlerError('Event not found', 404);
        }

        await event.update(eventData);

        return event;
    } catch (error) {
        throw new HandlerError(
            `Error updating event: ${error.message}`,
            500,
            error,
        );
    }
};

export const deleteEventService = async (eventId) => {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new HandlerError('Event not found', 404);
        }

        await event.destroy();

        return { message: 'Event deleted successfully' };
    } catch (error) {
        throw new HandlerError(
            `Error deleting event: ${error.message}`,
            500,
            error,
        );
    }
};

export const likeEventService = async () => {
    try {} catch (error) {}
};
