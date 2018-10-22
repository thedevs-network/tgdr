import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Card from './Card';
import CardsHeader from './CardsHeader';
import { IEntry } from 'client/store/storeTypes';
import { IGetEntriesParams } from 'client/store/entries';

const CardsWrapper = styled(Flex)`
  > * {
    max-width: calc(33.33333333% - 11px);
  }

  > *:nth-child(3n) {
    margin-right: 0;
  }
`;

interface IProps extends IGetEntriesParams {
  data: IEntry[];
  differentSorts?: boolean;
}

const Cards: React.SFC<IProps> = ({
  data,
  differentSorts,
  category,
  sort,
  type,
}) => (
  <>
    <CardsHeader
      category={category}
      sort={sort}
      type={type}
      useSortIcons={differentSorts}
    />
    <CardsWrapper flexWrap="wrap">
      {data.map(entry => (
        <Card key={entry.username} entry={entry} />
      ))}
    </CardsWrapper>
  </>
);

Cards.defaultProps = {
  differentSorts: false,
};

export default Cards;
