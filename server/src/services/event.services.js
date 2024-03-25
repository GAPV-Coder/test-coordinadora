import Event from '../models/event.model.js';
import Likes from '../models/likes.model.js';
import HandlerError from '../utils/handlerError.js';
import xlsx from 'xlsx-populate';

export const createEventService = async (eventData, userId) => {
    try {
        const newEvent = await Event.create({ ...eventData, id_user: userId });
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

export const likeEventService = async (eventId, userId) => {
    try {
        const like = await Likes.create({ id_event: eventId, id_user: userId });
        return like;
    } catch (error) {
        throw new HandlerError(
            `Error indicating you like this event: ${error.message}`,
            500,
            error,
        );
    }
};

export const createEventByFileService = async (filePath) => {
    try {
        const workbook = await xlsx.fromFileAsync(filePath);
        const sheet = workbook.sheet(0);

        const eventData = {
            event_name: sheet.cell('A2').value(),
            categories:
                typeof sheet.cell('B2').value() === 'string'
                    ? sheet
                            .cell('B2')
                            .value()
                            .split(',')
                            .map((category) => category.trim())
                    : [],
            description: sheet.cell('C2').value(),
            date_of_event: sheet.cell('D2').value(),
            location: sheet.cell('E2').value(),
            banner: sheet.cell('F2').value(),
            id_user: sheet.cell('G2').value(),
        };

        const newEvent = await Event.create(eventData);
        return newEvent;
    } catch (error) {
        throw new HandlerError(
            `Error creating event from file: ${error.message}`,
            500,
            error,
        );
    }
};
