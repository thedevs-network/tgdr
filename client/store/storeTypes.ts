import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { IAppState } from './store';
import * as authActions from './auth/authActions';
import * as entriesActions from './entries/entriesActions';
import * as entryActions from './entry/entryActions';
import * as reviewsActions from './reviews/reviewsActions';
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

export interface IReview {
  disliked?: boolean;
  liked?: boolean;
  text?: string;
}

export interface IEntry
  extends Readonly<{
      category: string;
      created_at: Date;
      description: string;
      dislikes: number;
      featured?: boolean;
      likes: number;
      members?: number;
      ratio: number;
      reject_reason?: string;
      review?: IReview;
      score: number;
      status: 'active' | 'pending' | 'rejected';
      telegram_id?: number;
      title: string;
      type: 'bot' | 'channel' | 'supergroup';
      username: string;
      verified?: boolean;
    }> {}

export type AsyncAction = ActionCreator<
  ThunkAction<Promise<void> | void, IAppState, void, Action<any>>
>;

export type RootAction =
  | ActionType<typeof authActions>
  | ActionType<typeof entriesActions>
  | ActionType<typeof entryActions>
  | ActionType<typeof reviewsActions>
  | ActionType<typeof submitEntryActions>
  | ActionType<typeof tagsActions>;
