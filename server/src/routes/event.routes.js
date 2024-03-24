import express from 'express';
import {
    createEventController,
    deleteEventController,
    getAllEventsController,
    getEventByIdController,
    updateEventController,
} from '../controllers/event.controllers.js';

const router = express.Router();

router.post('/create', createEventController);

router.get('/', getAllEventsController);

router.get('/:id', getEventByIdController);

router.put('/update/:id', updateEventController);

router.delete('/delete/:id', deleteEventController);

export default router;
