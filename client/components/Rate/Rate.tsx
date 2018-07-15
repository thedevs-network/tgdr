import * as React from 'react';
import { Flex } from 'grid-styled';
import RateButton from './RateButton';

const Rate: React.SFC = () => (
  <Flex mt={3} justify="space-between" width={1} px="4px">
    <RateButton type="like" />
    <RateButton type="dislike" />
  </Flex>
);

export default Rate;
