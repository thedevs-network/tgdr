import { body, param, query } from 'express-validator/check';
import { categories } from '../../constants/categories';
import { hasAd } from './utils';

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

export const entriesValidator = [
  query('category')
    .optional()
    .custom(value => categories.some(cat => cat.slug === value))
    .withMessage('Category does not exist.'),
  query('limit')
    .optional()
    .custom(value => Number(value) < 50)
    .withMessage('Limit should be a number less than 20.'),
  query('sort')
    .optional()
    .custom(value => value === 'hot' || value === 'new' || value === 'top')
    .withMessage('Sort should be one of top, hot or new.'),
  query('status')
    .optional()
    .custom(
      value => value === 'active' || value === 'pending' || value === 'rejected'
    )
    .withMessage('Status should be one of active, pending or rejected.'),
  query('type')
    .optional()
    .custom(
      value => value === 'channel' || value === 'bot' || value === 'supergroup'
    )
    .withMessage('Type should be one of channel, bot or supergroup.'),
];

export const reviewValidator = [
  body('disliked')
    .optional()
    .custom(value => typeof value === 'boolean')
    .withMessage('Disliekd must be boolean.')
    .custom((_v, { req }) => (req.body.disliked ? !req.body.liked : true))
    .withMessage('Can not both like and dislike an entry.'),
  body('liked')
    .optional()
    .custom(value => typeof value === 'boolean')
    .withMessage('Liked must be boolean.')
    .custom((_v, { req }) => (req.body.liked ? !req.body.disliked : true))
    .withMessage('Can not both like and dislike an entry.'),
  body('text', 'Liked parameter is missing.')
    .optional()
    .trim()
    .isLength({ min: 20, max: 400 })
    .withMessage('Text must be between 20 and 400 chars.')
    .custom(value => !hasAd(value))
    .withMessage(
      'Text must not contain any links or ads. Violators will be banned.'
    ),
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid. It must only contain A-Z, 0-9, _.'),
];

export const reportValidator = [
  body('username', 'Username is not valid.')
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must have at least 5 chars.')
    .matches(/^[a-z]\w+$/i)
    .withMessage('Username is not valid. It must only contain A-Z, 0-9, _.'),
  body('reason', 'Reason field is not valid.')
    .exists()
    .trim(),
  body('info')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Info is too long. Should be less than 400 chars.'),
];
