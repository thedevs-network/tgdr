import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../../elements/Icon';
import * as categories from '../../../../constants/categories';
import { capitalizeFirstLetter } from '../../../utils';

const Title = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #85919f;
`;

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64b5f6;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    color: #42a5f5;
    transform: scaleX(1.01) translateX(-4px);

    svg path {
      fill: #42a5f5;
    }
  }
`;

interface IProps {
  sort: 'hot' | 'top' | 'new';
  type: 'bot' | 'channel' | 'supergroup';
}

const CardsHeader: React.SFC<IProps> = ({ sort, type }) => {
  
  const sectionType = categories.types.find(item => item.slug === type);
  return (
  <Flex justify="space-between" mb={2}>
    <Flex align="center">
      <Icon name={sectionType.icon} size={18} fill="#C7CFD6" mr={3} />
      <Title>{capitalizeFirstLetter(sort)} {sectionType.name}</Title>
    </Flex>
    <Flex align="center">
      <ViewAllLink href="#" title={`View all ${type}s`}>
        <span>View all</span>
        <Icon name="arrowRight" size={10} fill="#64B5F6" ml={10} />
      </ViewAllLink>
    </Flex>
  </Flex>
)};

export default CardsHeader;
