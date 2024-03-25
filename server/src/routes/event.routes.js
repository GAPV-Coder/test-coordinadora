import express from 'express';
import {
    createEventController,
    deleteEventController,
    getAllEventsController,
    getEventByIdController,
    likeEventController,
    updateEventController,
} from '../controllers/event.controllers.js';
import { verifyToken } from '../middlewares/verifyUser.js';
import { eventValidations } from '../middlewares/validations.js';

const router = express.Router();

router.post('/create', eventValidations, verifyToken, createEventController);

router.get('/', verifyToken, getAllEventsController);

router.get('/:id', verifyToken, getEventByIdController);

router.put('/update/:id', eventValidations, verifyToken, updateEventController);

router.delete('/delete/:id', verifyToken, deleteEventController);

router.post('/like/:id_event/:id_user', verifyToken, likeEventController);

export default router;
