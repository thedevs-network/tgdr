import styled, { keyframes } from 'styled-components';
import { prop } from 'styled-tools';

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

interface IProps {
  size?: number;
}

const Spinner = styled.div<IProps>`
  position: relative;
  width: ${prop('size', 32)}px;
  height: ${prop('size', 32)}px;
  font-size: ${({ size = 32 }) => size / 4.8}px;
  border-radius: 50%;
  text-indent: -9999em;
  border-top: 1em solid rgba(181, 181, 181, 0.2);
  border-right: 1em solid rgba(181, 181, 181, 0.2);
  border-bottom: 1em solid rgba(181, 181, 181, 0.2);
  border-left: 1em solid #90caf9;
  transform: translateZ(0);
  animation: ${spinner} 0.8s infinite linear;

  :after {
    width: ${prop('size', 24)}px;
    height: ${prop('size', 24)}px;
    border-radius: 50%;
  }
`;

export default Spinner;
