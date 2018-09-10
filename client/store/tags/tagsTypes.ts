export enum TagsStateTypes {
  TAGS_LOAD = '@@tags/TAGS_LOAD',
}

export interface ITagsState {
  readonly data: Array<{
    [key: string]: number;
  }>;
  readonly isFetched: boolean;
}
