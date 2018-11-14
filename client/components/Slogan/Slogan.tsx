import React from 'react';
import { Flex } from 'grid-styled';
import { SloganSubTitle, SloganTitle } from '../elements/Typography';

const Slogan: React.SFC = () => (
  <Flex py={5} flexDirection="column" align="center" is="section">
    <SloganTitle>Discover the content you love on Telegram.</SloganTitle>
    <SloganSubTitle>
      Find top channels, bots and groups in Telegram.
    </SloganSubTitle>
  </Flex>
);

export default Slogan;
