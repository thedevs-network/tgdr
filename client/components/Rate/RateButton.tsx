import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from '@rebass/grid';
import { ifProp } from 'styled-tools';
import media from 'styled-media-query';
import Icon from '../elements/Icon';
import LoginModal from '../LoginModal';
import Modal from '../elements/Modal';

interface IButton {
  isActive?: boolean;
  isLike?: boolean;
}

const Button = styled.button<IButton>`
  width: 50px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${ifProp('isLike', 'rgba(100, 181, 246, 0.3)', 'rgba(239, 154, 154, 0.3)')};
  border-radius: 8px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    border-color: ${ifProp(
      'isLike',
      'rgba(100, 181, 246, 1)',
      'rgba(239, 154, 154, 1)'
    )};
    transform: scale(1.01, 1.01) translateY(-1px) translateZ(0);
  }

  ${ifProp(
    'isActive',
    css`
      border-color: ${ifProp(
        'isLike',
        'rgba(100, 181, 246, 1)',
        'rgba(239, 154, 154, 1)'
      )};
    `
  )};

  ${media.lessThan('medium')`
    width: 44px;
    height: 26px;
  `}
`;

const Count = styled.span<IButton>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${ifProp('isLike', '#91CAF7', '#F4B8B8')};
  ${ifProp(
    'isActive',
    css`
      color: ${ifProp(
        'isLike',
        'rgba(100, 181, 246, 1)',
        'rgba(239, 154, 154, 1)'
      )};
    `
  )};
`;

interface IProps {
  count: number;
  isActive: boolean;
  isAuthenticated: boolean;
  type: string;
  onClick(e: any): any;
}

const RateButton: React.SFC<IProps> = ({
  count,
  isActive,
  isAuthenticated,
  type,
  onClick,
}) => {
  const isLike = type === 'like';
  const name = isLike ? 'heart' : 'thumbsDown';
  const fill = isLike ? '#63B3F3' : 'none';
  const stroke = isLike ? 'none' : '#EF9A9A';

  const button = (
    <Button
      isLike={isLike}
      isActive={isActive}
      onClick={isAuthenticated ? onClick : null}
    >
      <Icon name={name} size={15} fill={fill} stroke={stroke} />
    </Button>
  );

  const rateButton = isAuthenticated ? (
    button
  ) : (
    <Modal trigger={button}>
      {closeModal => <LoginModal closeModal={closeModal} />}
    </Modal>
  );

  return (
    <Flex flexDirection="column" alignItems="center">
      {rateButton}
      <Count isLike={isLike} isActive={isActive}>
        {count || 0}
      </Count>
    </Flex>
  );
};

export default RateButton;
