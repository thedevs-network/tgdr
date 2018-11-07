import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../../elements/Icon';

const Rate = styled.span`
  font-size: 13px;
  color: #87c5f6;
`;

interface IProps {
  ratio: number
}

const CardRate: React.SFC<IProps> = ({ ratio }) => (
  <Flex align="center">
    <Icon name="heart" size={14} mr={2} fill="#63B3F3" />
    <Rate>{`${ratio}%`}</Rate>
  </Flex>
);

export default CardRate;
