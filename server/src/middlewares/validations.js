import { body, validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const signUpValidations = [
    body('name').notEmpty().withMessage('Name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: 7 })
        .withMessage('Password must be at least 7 characters long'),
    validateFields,
];

export const signInValidations = [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: 7 })
        .withMessage(
            'Password must be at least 7 characters long and not empty',
        ),
    validateFields,
];

export const eventValidations = [
    body('event_name')
        .notEmpty()
        .withMessage('The name of the event is required'),
    body('categories').isArray().withMessage('Categories must be an array'),
    body('description').notEmpty().withMessage('The description is mandatory'),
    body('date_of_event')
        .notEmpty()
        .withMessage('The event date must be in the format DD/MM/YYYYY'),
    body('location').notEmpty().withMessage('The location is mandatory'),
    validateFields,
];

export const commentsValidations = [
    body('comment').notEmpty().withMessage('Comment text is required'),
    validateFields,
];
