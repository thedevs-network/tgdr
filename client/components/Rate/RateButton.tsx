import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../elements/Icon';

interface IButton {
  isLike?: boolean;
}

const Button = styled.button<IButton>`
  width: 50px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ isLike }) => isLike
    ? 'rgba(100, 181, 246, 0.3)'
    : 'rgba(239, 154, 154, 0.3)'};
  border-radius: 8px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    border-color: ${({ isLike }) => isLike
    ? 'rgba(100, 181, 246, 1)'
    : 'rgba(239, 154, 154, 1)'};
    transform: scale(1.01, 1.01) translateY(-1px) translateZ(0);
  }
`;

const Count = styled.span<IButton>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ isLike }) => isLike ? '#91CAF7' : '#F4B8B8'};
`;

interface IRateButton {
  type: string;
}

const RateButton: React.SFC<IRateButton> = ({ type }) => {
  const isLike = type === 'like';
  const name = isLike ? 'heart' : 'thumbsDown';
  const fill = isLike ? '#63B3F3' : 'none';
  const stroke = isLike ? 'none' : '#EF9A9A';

  return (
    <Flex flexDirection="column" align="center">
      <Button isLike={isLike}>
        <Icon name={name} size={15} fill={fill} stroke={stroke} />
      </Button>
      <Count isLike={isLike}>
        2145
      </Count>
    </Flex>
  );
};

export default RateButton;