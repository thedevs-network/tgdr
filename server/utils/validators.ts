import { body, param } from 'express-validator/check';
import { categories } from '../../constants/categories';

export const newEntryValidators = [
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid.'),
  body('category', 'Category is not valid')
    .exists()
    .custom(value => categories.some(cat => cat.slug === value)),
  body('title', 'Title is not valid')
    .exists()
    .trim()
    .isLength({ min: 3, max: 54 })
    .withMessage('Title must be between 3 and 54 chars.'),
  body('description', 'Description is not valid')
    .exists()
    .trim()
    .isLength({ min: 20, max: 800 })
    .withMessage('Description must be between 20 and 800 chars.'),
];

export const entryValidator = [
  param('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid. It must only contain A-Z, 0-9, _.'),
];

export const reviewValidator = [
  body('text', 'Liked parameter is missing.')
    .optional()
    .trim()
    .isLength({ min: 20, max: 400 })
    .withMessage('Text must be between 20 and 400 chars.'),
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid. It must only contain A-Z, 0-9, _.'),
];

export const removeReviewValidator = [
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid. It must only contain A-Z, 0-9, _.'),
];
