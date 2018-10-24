import { IAppState } from '../store';
import { IEntriesState, IGetEntriesParams } from '../store/entries';

export const getAuthHeader = (getState: () => IAppState) => {
  const { token } = getState().auth;
  return {
    headers: {
      Authorization: token,
    },
  };
};

export const shortenLongName = (name: string, maxChars: number) =>
  name.length > maxChars ? `${name.slice(0, maxChars)}...` : name;

export const capitalizeFirstLetter = (text: string): string =>
  text[0].toUpperCase() + text.slice(1);

export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const areParamsEqual = (
  params: IGetEntriesParams,
  state: IEntriesState
): boolean =>
  // Number of current entries should be same or more than requested
  params.limit <= state.limit &&
  state.data[params.type][params.sort].length &&
  // If there are categories, they should be equal
  (params.category || state.category
    ? params.category === state.category
    : true);

export const getParamsFromQueries = ({
  category,
  sort,
  type,
}: IGetEntriesParams): IGetEntriesParams[] => {

  if (category && sort && type) {
    return [{ category, sort, type }];  
  }

  if (sort && type) {
    return [{ sort, type }];  
  }
  
  if (type && !category) {
    return [
      { sort: 'top', type },
      { sort: 'hot', type },
      { sort: 'new', type },
    ];
  }

  if (category && !type) {
    return [
      { category, sort: 'top', type: 'channel' },
      { category, sort: 'top', type: 'bot' },
      { category, sort: 'top', type: 'supergroup' },
    ];
  }

  if (category && type) {
    return [
      { category, sort: 'top', type },
      { category, sort: 'hot', type },
      { category, sort: 'new', type },
    ];  
  }

  if (sort) {
    return [
      { sort, type: 'channel' },
      { sort, type: 'bot' },
      { sort, type: 'supergroup' },
    ];
  }

  return [];
};
