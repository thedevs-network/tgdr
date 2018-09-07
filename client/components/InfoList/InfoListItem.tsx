import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon, { IIcons } from '../elements/Icon';

const Text = styled.span`
  font-size: 14px;
  color: #888888;
`;

interface IInfoListItem {
  icon: keyof IIcons;
  size?: number;
  text: string;
}

const InfoListItem: React.SFC<IInfoListItem> = ({ icon, size, text }) => (
  <Flex mb={2}>
    <Icon name={icon} mr={3} size={size} fill="#C7CFD6" />
    <Text>{text}</Text>
  </Flex>
);

InfoListItem.defaultProps = {
  size: 14,
};

export default InfoListItem;
