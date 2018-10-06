import { IAppState } from '../store';

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

export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });
