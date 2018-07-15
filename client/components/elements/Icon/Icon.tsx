import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { prop } from 'styled-tools';
import ArrowRight from '../../../assets/images/arrow-right-icon.svg';
import At from '../../../assets/images/at-icon.svg';
import Calendar from '../../../assets/images/calendar-icon.svg';
import ChevronRight from '../../../assets/images/chevron-right.svg';
import Heart from '../../../assets/images/heart-icon.svg';
import Message from '../../../assets/images/messages-icon.svg';
import Robot from '../../../assets/images/robot-icon.svg';
import Search from '../../../assets/images/search-icon.svg';
import Station from '../../../assets/images/station-icon.svg';
import Telegram from '../../../assets/images/telegram-icon.svg';
import ThumbsDown from '../../../assets/images/thumbs-down-icon.svg';
import Users from '../../../assets/images/users-icon.svg';

export interface IIcons {
  arrowRight: JSX.Element;
  at: JSX.Element;
  calendar: JSX.Element;
  chevronRight: JSX.Element;
  heart: JSX.Element;
  messages: JSX.Element;
  robot: JSX.Element;
  search: JSX.Element;
  station: JSX.Element;
  telegram: JSX.Element;
  thumbsDown: JSX.Element;
  users: JSX.Element;
}

const icons: IIcons = {
  arrowRight: <ArrowRight />,
  at: <At />,
  calendar: <Calendar />,
  chevronRight: <ChevronRight />,
  heart: <Heart />,
  messages: <Message />,
  robot: <Robot />,
  search: <Search />,
  station: <Station />,
  telegram: <Telegram />,
  thumbsDown: <ThumbsDown />,
  users: <Users />,
};

const IconWrapper = styled(Flex)`
  svg {
    width: ${prop('size', 16)}px;
    height: auto;
    
    path {
      fill: ${prop('fill', '#C7CFD6')};
      stroke: ${prop('stroke', 'none')};
      opacity: 1;
      transition: fill 0.3s ease-out;
    }
  }

  ${({ hoverFill }: { hoverFill?: string }) => hoverFill && css`
    :hover {
      svg path {
        fill: ${hoverFill};
      }
    }
  `}
`;

interface IIcon {
  fill?: string;
  stroke?: string;
  hoverFill?: string;
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