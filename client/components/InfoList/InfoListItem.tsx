import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { prop } from 'styled-tools';
import Icon, { IIcons } from '../elements/Icon';

const Text = styled.span`
  min-width: 50%;
  flex: 1 0 0;
  font-size: 14px;
  color: ${prop('color', '#888888')};
  word-wrap: break-word;
`;

interface IInfoListItem {
  bigIcon?: boolean;
  color?: string;
  icon: keyof IIcons;
  size?: number;
  text: string | number;
}

const InfoListItem: React.SFC<IInfoListItem> = ({
  color,
  icon,
  size,
  text,
}) => (
  <Flex mb={2}>
    <Icon name={icon} mr={2} size={size} fill={color || '#C7CFD6'} />
    <Text color={color}>{text}</Text>
  </Flex>
);

InfoListItem.defaultProps = {
  color: null,
  size: 14,
};

export default InfoListItem;
