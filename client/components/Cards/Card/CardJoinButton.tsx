import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../elements/Icon';

const Button = styled.button`
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 6px;
  background-color: transparent;
  border: 1px solid #64B5F6;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease-out;
  transform: translateZ(0);

  span {
    font-size: 12px;
    color: #64B5F6;
    margin-right: 2px;
    transition: color 0.3s ease-out;
  }

  :hover {
    background-color:#64B5F6;

    span {
      color: white;
    }

    svg path {
      fill: white;
    }
  }
`;

const CardJoinButton: React.SFC = () => (
  <Button>
    <span>+</span>
    <Icon name="telegram" size={12} fill="#64B5F6" />
  </Button>
);

export default CardJoinButton;