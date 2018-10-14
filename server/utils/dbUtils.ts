import * as R from 'ramda';
import * as subDays from 'date-fns/sub_days';

export const getMatches = R.pipe(
  R.ifElse(
    R.propEq('sort', 'hot'),
    R.assocPath(['created_at', '$gt'], subDays(new Date(), 30)),
    R.identity,
  ),
  R.pick(['category', 'status', 'type', 'created_at'])
);

export const getLimit = R.pipe(
  R.propOr(9, 'limit'),
  Number
);

export const getSkip = R.pipe(
  R.propOr(0, 'skip'),
  Number
);

export const getSort = R.pipe(
  R.propOr('new', 'sort'),
  R.cond([
    [R.equals('new'), R.always('created_at')],
    [R.or(R.equals('top'), R.equals('hot')), R.always('ratio')],
  ])
);

export const getOrder = R.pipe(
  R.propOr(-1, 'order'),
  Number
);
