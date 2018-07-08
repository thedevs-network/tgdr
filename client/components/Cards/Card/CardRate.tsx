import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../../elements/Icon';

const Rate = styled.span`
  font-size: 13px;
  color: #87C5F6;
`;

const CardRate: React.SFC = () => (
  <Flex align="center">
    <Icon name="heart" size={14} mr={2} fill="#63B3F3" />
    <Rate>
      87%
    </Rate>
  </Flex>
);

export default CardRate;