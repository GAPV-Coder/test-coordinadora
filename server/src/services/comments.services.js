import Comments from '../models/comments.model.js';
import HandlerError from '../utils/handlerError.js';

export const createCommentService = async (commentData) => {
    try {
        const { comment, id_event, id_user } = commentData;
        const newComment = await Comments.create({
            comment,
            id_event,
            id_user,
        });

        return newComment;
    } catch (error) {
        throw new HandlerError(
            `Error creating comment: ${error.message}`,
            500,
            error,
        );
    }
};

export const updateCommentService = async (commentId, updatedCommentData) => {
    try {
        const { comment } = updatedCommentData;
        const updatedComment = await Comments.findByPk(commentId);

        if (!updatedComment) {
            throw new HandlerError('Comment not found', 400);
        }

        updatedComment.comment = comment;
        await updatedComment.save();
        return updatedComment;
    } catch (error) {
        throw new HandlerError(
            `Error updating comment: ${error.message}`,
            500,
            error,
        );
    }
};

export const deleteCommentService = async (commentId) => {
    try {
        const deletedComment = await Comments.findByPk(commentId);
        if (!deletedComment) {
            throw new HandlerError('Comment not found', 400);
        }

        await deletedComment.destroy();
        return deletedComment;
    } catch (error) {
        throw new HandlerError(
            `Error deleting comment: ${error.message}`,
            500,
            error,
        );
    }
};
