import { ActionType } from 'typesafe-actions';
import { IAppState } from './store';
import * as authActions from './auth/authActions';
import * as submitEntryActions from './submitEntry/submitEntryActions';
import * as tagsActions from './tags/tagsActions';

export interface IMessage
  extends Readonly<{
      message: Readonly<{
        text: string;
        title: string;
        type: 'error' | 'pending' | 'success';
      }>;
    }> {}

export type getStateType = () => IAppState;

export type RootAction =
  | ActionType<typeof authActions>
  | ActionType<typeof submitEntryActions>
  | ActionType<typeof tagsActions>;
