import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from '@rebass/grid';
import { prop } from 'styled-tools';
import media from 'styled-media-query';
import ArrowLeft from '../../../assets/images/arrow-left-icon.svg';
import ArrowRight from '../../../assets/images/arrow-right-icon.svg';
import At from '../../../assets/images/at-icon.svg';
import BarChart from '../../../assets/images/bar-chart-icon.svg';
import Calendar from '../../../assets/images/calendar-icon.svg';
import Camera from '../../../assets/images/camera-icon.svg';
import Check from '../../../assets/images/check-icon.svg';
import ChevronRight from '../../../assets/images/chevron-right-icon.svg';
import Clock from '../../../assets/images/clock-icon.svg';
import Close from '../../../assets/images/close-icon.svg';
import Envelope from '../../../assets/images/envelope-icon.svg';
import Flame from '../../../assets/images/flame-icon.svg';
import GitHub from '../../../assets/images/github-icon.svg';
import Heart from '../../../assets/images/heart-icon.svg';
import Info from '../../../assets/images/info-icon.svg';
import Logout from '../../../assets/images/log-out-icon.svg';
import Menu from '../../../assets/images/menu-icon.svg';
import Message from '../../../assets/images/messages-icon.svg';
import Robot from '../../../assets/images/robot-icon.svg';
import Search from '../../../assets/images/search-icon.svg';
import Star from '../../../assets/images/star-icon.svg';
import Station from '../../../assets/images/station-icon.svg';
import Tag from '../../../assets/images/tag-icon.svg';
import Telegram from '../../../assets/images/telegram-icon.svg';
import ThumbsDown from '../../../assets/images/thumbs-down-icon.svg';
import TimerSand from '../../../assets/images/timer-sand-icon.svg';
import Twitter from '../../../assets/images/twitter-icon.svg';
import Users from '../../../assets/images/users-icon.svg';

export interface IIcons {
  arrowLeft: JSX.Element;
  arrowRight: JSX.Element;
  at: JSX.Element;
  barChart: JSX.Element;
  calendar: JSX.Element;
  camera: JSX.Element;
  check: JSX.Element;
  chevronRight: JSX.Element;
  clock: JSX.Element;
  close: JSX.Element;
  envelope: JSX.Element;
  flame: JSX.Element;
  github: JSX.Element;
  heart: JSX.Element;
  info: JSX.Element;
  logout: JSX.Element;
  menu: JSX.Element;
  messages: JSX.Element;
  robot: JSX.Element;
  search: JSX.Element;
  star: JSX.Element;
  station: JSX.Element;
  tag: JSX.Element;
  telegram: JSX.Element;
  thumbsDown: JSX.Element;
  timerSand: JSX.Element;
  twitter: JSX.Element;
  users: JSX.Element;
}

const icons: IIcons = {
  arrowLeft: <ArrowLeft />,
  arrowRight: <ArrowRight />,
  at: <At />,
  barChart: <BarChart />,
  calendar: <Calendar />,
  camera: <Camera />,
  check: <Check />,
  chevronRight: <ChevronRight />,
  clock: <Clock />,
  close: <Close />,
  envelope: <Envelope />,
  flame: <Flame />,
  github: <GitHub />,
  heart: <Heart />,
  info: <Info />,
  logout: <Logout />,
  menu: <Menu />,
  messages: <Message />,
  robot: <Robot />,
  search: <Search />,
  star: <Star />,
  station: <Station />,
  tag: <Tag />,
  telegram: <Telegram />,
  thumbsDown: <ThumbsDown />,
  timerSand: <TimerSand />,
  twitter: <Twitter />,
  users: <Users />,
};

interface IIcon {
  fill?: string;
  stroke?: string;
  hoverFill?: string;
  ml?: number[] | number;
  mr?: number[] | number;
  mx?: number[] | number;
  my?: number[] | number;
  name: keyof IIcons;
  size?: number;
}

const IconWrapper = styled(
  ({ fill, hoverFill, size, stroke, ...rest }: Partial<IIcon>) => (
    <Flex {...rest} alignItems="center" justifyContent="center" as="span" />
  )
)`
  svg {
    width: ${prop('size', 16)}px;
    height: auto;

    path {
      fill: ${prop('fill', '#C7CFD6')};
      stroke: ${prop('stroke', 'none')};
      opacity: 1;
      transition: fill 0.3s ease-out, stroke 0.3s ease-out;
    }
  }

  ${({ hoverFill }: { hoverFill?: string }) =>
    hoverFill &&
    css`
      :hover {
        svg path {
          fill: ${hoverFill};
        }
      }
    `};

  ${media.lessThan('470px')`
    svg {
      width: ${({ size }) => (size ? size * 0.9 : 15)}px;
    }
  `};
`;

const Icon: React.SFC<IIcon> = ({ name, ...props }) => (
  <IconWrapper {...props}>{icons[name]}</IconWrapper>
);

export default Icon;
