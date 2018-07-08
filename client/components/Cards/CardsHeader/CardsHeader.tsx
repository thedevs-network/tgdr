import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../../elements/Icon';

const Title = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #85919F;
`;

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64B5F6;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover {
    color: #2196F3;
    transform: scaleX(1.01) translateX(-4px);

    svg path {
      fill: #2196F3;
    }
  }
`;

const CardsHeader = () => (
  <Flex justify="space-between" mb={2}>
    <Flex align="center">
      <Icon name="station" size={18} fill="#C7CFD6" hoverFill="#C7CFD6" mr={3} />
      <Title>
        Channels
      </Title>
    </Flex>
    <Flex align="center">
      <ViewAllLink href="#" title="View all channels">
        <span>View all</span>
        <Icon name="arrowRight" size={10} fill="#64B5F6" hoverFill="#64B5F6" ml={10} />
      </ViewAllLink>
    </Flex>
  </Flex>
);

export default CardsHeader;
