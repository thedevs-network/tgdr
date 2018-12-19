import React from 'react';
import { Flex } from '@rebass/grid';
import { SloganSubTitle, SloganTitle } from '../elements/Typography';

const Slogan: React.SFC = () => (
  <Flex py={5} flexDirection="column" alignItems="center" as="section">
    <SloganTitle textAlign="center">
      Discover the content you love on Telegram.
    </SloganTitle>
    <SloganSubTitle textAlign="center">
      Find top channels, bots and groups in Telegram.
    </SloganSubTitle>
  </Flex>
);

export default Slogan;
