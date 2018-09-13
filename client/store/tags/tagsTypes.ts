export enum TagsStateTypes {
  TAGS_LOAD = '@@tags/TAGS_LOAD',
}

export interface ITags extends Record<string, number> {}

export interface ITagsState
  extends Readonly<{
      data: ReadonlyArray<ITags>;
      isFetched: boolean;
    }> {}
