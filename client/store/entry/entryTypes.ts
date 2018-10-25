import { IEntry } from '../storeTypes';

export enum EntryStateTypes {
  REQUEST = '@@entry/REQUEST',
  SUCCESS = '@@entry/SUCCESS',
  FAILURE = '@@entry/FAILURE',
}

export interface IEntryState
  extends Readonly<{
      data: IEntry;
      isLoading: boolean;
      hasError: boolean;
    }> {}
