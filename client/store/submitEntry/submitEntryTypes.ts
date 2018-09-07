import { IMessage } from '../generalStateTypes';

export enum SubmitEntryStateTypes {
  SUBMIT_ENTRY_REQUEST = '@@submit/SUBMIT_ENTRY_REQUEST',
  SUBMIT_ENTRY_SUCCESS = '@@submit/SUBMIT_ENTRY_SUCCESS',
  SUBMIT_ENTRY_FAILURE = '@@submit/SUBMIT_ENTRY_FAILURE',
  SUBMIT_ENTRY_CLEAR = '@@submit/SUBMIT_ENTRY_CLEAR',
}

export interface ISubmitEntryState extends IMessage {
  readonly isFetched: boolean;
  readonly isLoading: boolean;
}

export interface ISubmitEntryParams {
  username: string;
  category: string;
  title: string;
  description: string;
}
