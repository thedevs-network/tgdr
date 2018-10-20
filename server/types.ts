export interface IEntryQuery {
  category?: string,
  limit?: number,
  search?: string,
  skip?: number,
  sort?: 'top' | 'hot' | 'new',
  status?: 'active' | 'pending' | 'rejected',
  type?: 'channel' | 'group' | 'bot',
}