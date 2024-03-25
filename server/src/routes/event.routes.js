import express from 'express';
import multer from 'multer';
import {
    createEventByFileController,
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

const upload = multer({ dest: 'uploads/' });

router.post('/create', eventValidations, verifyToken, createEventController);

router.get('/', verifyToken, getAllEventsController);

router.get('/:id', verifyToken, getEventByIdController);

router.put('/update/:id', eventValidations, verifyToken, updateEventController);

router.delete('/delete/:id', verifyToken, deleteEventController);

router.post('/like/:id_event/:id_user', verifyToken, likeEventController);

router.post(
    '/create-from-file',
    verifyToken,
    upload.single('file'),
    createEventByFileController,
);

export default router;
