import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { prop } from 'styled-tools';
import ChevronRight from '../../../assets/images/chevron-right.svg';
import Message from '../../../assets/images/messages-icon.svg';
import Robot from '../../../assets/images/robot-icon.svg';
import Search from '../../../assets/images/search-icon.svg';
import Station from '../../../assets/images/station-icon.svg';

export interface IIcons {
  chevronRight: JSX.Element;
  messages: JSX.Element;
  robot: JSX.Element;
  search: JSX.Element;
  station: JSX.Element;
}

const icons: IIcons = {
  chevronRight: <ChevronRight />,
  messages: <Message />,
  robot: <Robot />,
  search: <Search />,
  station: <Station />,
};

const IconWrapper = styled(Flex)`
  svg {
    width: ${prop('size', 16)}px;
    height: auto;
  }
`;

interface IIcon {
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  name: keyof IIcons;
  size?: number;
}

const Icon: React.SFC<IIcon> = ({ name, ...props }) => (
  <IconWrapper {...props}>
    {icons[name]}
  </IconWrapper>
);

export default Icon;