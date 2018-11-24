import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { prop } from 'styled-tools';
import media from 'styled-media-query';
import Icon, { IIcons } from '../elements/Icon';

const Wrapepr = styled(Flex)`
  > *:first-child {
    margin-top: 2px;
  }
`;

const Text = styled(({ color, ...rest }: { color: string }) => (
  <span {...rest} />
))`
  min-width: 50%;
  flex: 1 0 0;
  font-size: 14px;
  color: ${prop('color')};
  word-wrap: break-word;

  ${media.lessThan('470px')`
    font-size: 13px;
  `};
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
  <Wrapepr mb={2} mr={[2, 0]} align="flex-start">
    <Icon name={icon} mr={[1, 2]} size={size} fill={color || '#C7CFD6'} />
    <Text color={color || '#888888'}>{text}</Text>
  </Wrapepr>
);

InfoListItem.defaultProps = {
  color: null,
  size: 14,
};

export default InfoListItem;
