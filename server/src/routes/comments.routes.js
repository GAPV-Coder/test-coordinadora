import express from 'express';
import {
    createCommentController,
    deleteCommentController,
    updateCommentController,
} from '../controllers/comments.controllers.js';
import addEventDataMiddleware from '../middlewares/eventData.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

router.post('/create/:id_event/:id_user', addEventDataMiddleware, verifyToken, createCommentController);

router.put('/update/:id', verifyToken, updateCommentController);

router.delete('/delete/:id', verifyToken, deleteCommentController);

export default router;
