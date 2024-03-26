import express from 'express';
import {
    createCommentController,
    deleteCommentController,
    updateCommentController,
} from '../controllers/comments.controllers.js';
import addEventDataMiddleware from '../middlewares/eventData.js';
import { verifyToken } from '../middlewares/verifyUser.js';
import { commentsValidations } from '../middlewares/validations.js';

const router = express.Router();

router.post('/create/:id_event/:id_user', commentsValidations, addEventDataMiddleware, verifyToken, createCommentController);

router.put('/update/:id', commentsValidations, verifyToken, updateCommentController);

router.delete('/delete/:id', verifyToken, deleteCommentController);

export default router;
