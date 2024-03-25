import express from 'express';
import {
    createCommentController,
    deleteCommentController,
    updateCommentController,
} from '../controllers/comments.controllers.js';

const router = express.Router();

router.post('/create', createCommentController);

router.put('/update/:id', updateCommentController);

router.delete('/delete/:id', deleteCommentController);

export default router;
