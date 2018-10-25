import * as R from 'ramda';
import * as subDays from 'date-fns/sub_days';
import { AllCategoriesType } from '../../constants/categories';

export const getEntryQuery = R.pipe(
  R.pick(['category', 'limit', 'skip', 'sort', 'status', 'type']),
  R.merge({
    limit: 9,
    skip: 0,
    sort: 'top',
    status: 'active',
  })
);

export const getMatches = R.pipe(
  R.when(
    R.propEq('sort', 'hot'),
    R.assocPath(['created_at', '$gt'], subDays(new Date(), 30))
  ),
  R.pick(['category', 'status', 'type', 'created_at'])
);

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
    [R.equals('new'), R.always('created_at')],
    [R.or(R.equals('top'), R.equals('hot')), R.always('ratio')],
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
