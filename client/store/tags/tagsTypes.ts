export enum TagsStateTypes {
  TAGS_LOAD = '@@tags/TAGS_LOAD',
}

export interface ITags extends Readonly<Record<string, number>> {}

export interface ITagsState
  extends Readonly<{
      data: ITags;
      isFetched: boolean;
    }> {}
