import * as R from 'ramda';
import * as decay from 'decay';
import * as subDays from 'date-fns/sub_days';
import { AllCategoriesType } from '../../constants/categories';
import { IReviewSchema } from '../models/Review';
import { IEntrySchema } from '../models/Entry';
import config from '../config';

const wilsonScore = decay.wilsonScore();

export const isAdmin = (id: number) => id === config.admin_id;

export const getReportChat = (): number => 
  config.report_chat_id || config.admin_id;

export const hasAd = (text: string) =>
  // tslint:disable-next-line:max-line-length
  /((http(s)?(\:\/\/))?(www\.)?([\w\-\.\/])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:\?\!\@\^\$ -]/gi.test(
    text
  ) || /(@\w+)/gi.test(text);

export const getDbName = id => 'bot.' + id;

export const stringifyValues = (query: Record<string, any>): string =>
  Object.keys(query)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((str, item) => `${query[item]}${str ? `.${str}` : ''}`, '');

export const getEntryQuery = R.pipe(
  R.pick(['category', 'limit', 'skip', 'search', 'sort', 'status', 'type']),
  R.merge({
    limit: 9,
    skip: 0,
    sort: 'top',
    status: 'active',
  })
);

export const getReviewsQuery = R.pipe(
  R.pick(['entryId', 'limit', 'skip']),
  R.merge({
    entryId: '',
    limit: 4,
    skip: 0,
  })
);

export const getMatches = R.pipe(
  R.when(
    R.propEq('sort', 'hot'),
    R.assocPath(['created_at', '$gt'], subDays(new Date(), 15))
  ),
  R.pick(['category', 'status', 'type', 'created_at', '$text'])
);

export const getSearch = query =>
  query.search ? { $text: { $search: query.search } } : {};

export const getLimit = R.pipe(
  R.prop('limit'),
  Number
);

export const getSkip = R.pipe(
  R.prop('skip'),
  Number
);

export const getSort = R.pipe(
  R.prop('sort'),
  R.cond([
    [R.equals('new'), R.always({ created_at: -1 })],
    [R.equals('top'), R.always({ score: -1, created_at: -1 })],
    [R.equals('hot'), R.always({ score: -1, created_at: -1 })],
    [R.always(true), R.always({})],
  ])
);

export const getLength = R.pipe(
  R.values,
  R.filter(Boolean),
  R.length
);

export const findCategory = (categories: AllCategoriesType, param: string) => (
  cat: keyof AllCategoriesType
) => categories[cat].find(item => item.slug === param) && param;

export const omitExtraFields = (document: {}) =>
  R.omit(['_id', '__v'], document);

export const getFeedbackUpdates = R.pipe(
  R.pick(['dislikes', 'likes']),
  R.ifElse(
    R.pipe(
      R.values,
      R.length,
      R.lt(0)
    ),
    R.objOf('$inc'),
    R.always({})
  )
);

export const getEntryUpdates = (body, admin?: boolean) => {
  const feedbacks = getFeedbackUpdates(body);

  const setParams = R.pipe(
    R.pick([
      'score',
      ...(admin
        ? [
            'category',
            'description',
            'featured',
            'members',
            'nophoto',
            'reject_reason',
            'status',
            'title',
            'type',
            'verified',
          ]
        : []),
    ]),
    R.ifElse(
      R.pipe(
        R.values,
        R.length,
        R.lt(0)
      ),
      R.objOf('$set'),
      R.always({})
    )
  )(body);

  return R.merge(feedbacks, setParams);
};

export const getEntryFeedback = (
  review: IReviewSchema,
  disliked: boolean,
  liked: boolean
) => {
  const likes = liked && {
    likes: 1,
    ...(review && review.disliked && { dislikes: -1 }),
  };
  const dislikes = disliked && {
    dislikes: 1,
    ...(review && review.liked && { likes: -1 }),
  };
  return { ...dislikes, ...likes };
};

export const getEntryRemoveFeedback = (review: IReviewSchema) =>
  review.liked ? { likes: -1 } : { dislikes: -1 };

export const getScore = (
  entry: IEntrySchema,
  feedback: { likes?: number; dislikes?: number }
) =>
  wilsonScore(
    entry.likes + (feedback.likes || 0),
    entry.dislikes + (feedback.dislikes || 0)
  );

export const getReviewUpdate = R.pick([
  'created_at',
  'disliked',
  'entry',
  'liked',
  'text',
  'user',
]);
