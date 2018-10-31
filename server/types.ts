export interface IEntryQuery {
  category?: string,
  limit?: number,
  search?: string,
  skip?: number,
  sort?: 'top' | 'hot' | 'new',
  status?: 'active' | 'pending' | 'rejected',
  type?: 'channel' | 'group' | 'bot',
}

export interface IGetReviewsQuery {
  entryId: string,
  limit?: number,
  skip?: number,
}

export interface IReviewQuery {
  disliked?: boolean;
  entry?: string | {};
  liked?: boolean;
  text?: string;
  user?: string | {};
}

export interface IRemoveReviewQuery {
  entryId: string;
  userId: string;
}