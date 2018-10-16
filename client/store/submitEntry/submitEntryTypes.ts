import { IMessage } from '../storeTypes';

export enum SubmitEntryStateTypes {
  REQUEST = '@@submit/REQUEST',
  SUCCESS = '@@submit/SUCCESS',
  FAILURE = '@@submit/FAILURE',
  CLEAR = '@@submit/CLEAR',
}

export interface ISubmitEntryState
  extends IMessage,
    Readonly<{
      isFetched: boolean;
      isLoading: boolean;
    }> {}

export interface ISubmitEntryParams {
  username: string;
  category: string;
  title: string;
  description: string;
}
