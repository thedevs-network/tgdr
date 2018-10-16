export enum TagsStateTypes {
  LOAD = '@@tags/LOAD',
}

export interface ITags extends Readonly<Record<string, number>> {}

export interface ITagsState
  extends Readonly<{
      data: ITags;
      isFetched: boolean;
    }> {}
