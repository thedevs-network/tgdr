export interface IMessage {
  readonly message: {
    readonly text: string;
    readonly title: string;
    readonly type: 'error' | 'pending' | 'success';
  };
}
