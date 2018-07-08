import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { prop } from 'styled-tools';
import ArrowRight from '../../../assets/images/arrow-right-icon.svg';
import ChevronRight from '../../../assets/images/chevron-right.svg';
import Heart from '../../../assets/images/heart-icon.svg';
import Message from '../../../assets/images/messages-icon.svg';
import Robot from '../../../assets/images/robot-icon.svg';
import Search from '../../../assets/images/search-icon.svg';
import Station from '../../../assets/images/station-icon.svg';
import Telegram from '../../../assets/images/telegram-icon.svg';

export interface IIcons {
  arrowRight: JSX.Element;
  chevronRight: JSX.Element;
  heart: JSX.Element;
  messages: JSX.Element;
  robot: JSX.Element;
  search: JSX.Element;
  station: JSX.Element;
  telegram: JSX.Element;
}

const icons: IIcons = {
  arrowRight: <ArrowRight />,
  chevronRight: <ChevronRight />,
  heart: <Heart />,
  messages: <Message />,
  robot: <Robot />,
  search: <Search />,
  station: <Station />,
  telegram: <Telegram />,
};

const IconWrapper = styled(Flex)`
  svg {
    width: ${prop('size', 16)}px;
    height: auto;
    
    path {
      fill: ${prop('fill', '#C7CFD6')};
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