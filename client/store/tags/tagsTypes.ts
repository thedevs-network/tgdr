export enum TagsStateTypes {
  LOAD = '@@tags/LOAD',
  SET_ACTIVES = '@@tags/SET_ACTIVES',
}

export interface ITags extends Readonly<Record<string, number>> {}

export interface ITagsState
  extends Readonly<{
      actives: string[];
      data: ITags;
      isFetched: boolean;
    }> {}
