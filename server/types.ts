export interface IEntryQuery {
  category?: string,
  limit?: number,
  search?: string,
  skip?: number,
  sort?: 'top' | 'hot' | 'new',
  type: 'channel' | 'group' | 'bot',
}