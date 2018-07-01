import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const Title = styled.h2`
  margin: 8px 0;
  padding: 0;
  font-size: 20px;
  color: #808080;
`;

const SubTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: normal;
  color: #A8A8A8;
`;

const Slogan: React.SFC = () => (
  <Flex py={5} flexDirection="column" align="center" is="section">
    <Title>
      Discover the content you love on Telegram.
    </Title>
    <SubTitle>
      Find top channels, bots and groups in Telegram.
    </SubTitle>
  </Flex>
);

export default Slogan;