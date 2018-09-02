import { body } from 'express-validator/check';
import { categories } from '../../constants/categories';

export const entryValidators = [
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 6 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/)
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