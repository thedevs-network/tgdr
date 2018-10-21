import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Card from './Card';
import CardsHeader from './CardsHeader';
import { IEntry } from 'client/store/storeTypes';

const CardsWrapper = styled(Flex)`
  > * {
    max-width: calc(33.33333333% - 11px);
  }

  > *:nth-child(3n) {
    margin-right: 0;
  }
`;

interface IProps {
  data: IEntry[];
  sort: 'hot' | 'top' | 'new';
  type: 'bot' | 'channel' | 'supergroup';
}

const Cards: React.SFC<IProps> = ({ data, sort, type }) => (
  <>
    <CardsHeader sort={sort} type={type} />
    <CardsWrapper flexWrap="wrap">
      {data.map(entry => <Card key={entry.username} entry={entry} />)}
    </CardsWrapper>
  </>
);

export default Cards;
