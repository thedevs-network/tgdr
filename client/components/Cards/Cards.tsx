import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Card from './Card';
import CardsHeader from './CardsHeader';

const CardsWrapper = styled(Flex)`
  > * {
    max-width: calc(33.33333333% - 11px);
  }

  > *:nth-child(3n) {
    margin-right: 0;
  }
`;

const Cards: React.SFC = () => (
  <>
    <CardsHeader />
    <CardsWrapper flexWrap="wrap">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </CardsWrapper>
  </>
);

export default Cards;
