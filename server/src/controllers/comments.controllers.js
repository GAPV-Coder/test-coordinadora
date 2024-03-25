import {
    createCommentService,
    updateCommentService,
    deleteCommentService,
} from '../services/comments.services.js';

export const createCommentController = async (req, res) => {
    try {
        const { comment, id_event, id_user } = req.body;
        const newComment = await createCommentService({
            comment,
            id_event,
            id_user,
        });

        res.status(201).json({
            message: 'Comment successfully created',
            data: newComment,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const updateCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const updatedComment = await updateCommentService(id, { comment });

        res.status(201).json({
            message: 'Comment updated successfully',
            data: updatedComment,
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};

export const deleteCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await deleteCommentService(id);

        res.status(201).json({
            message: 'Comment deleted successfully',
        });
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message });
    }
};
