import { IAppState } from './store';

export interface IMessage {
  readonly message: {
    readonly text: string;
    readonly title: string;
    readonly type: 'error' | 'pending' | 'success';
  };
}

export type getStateType = () => IAppState;
