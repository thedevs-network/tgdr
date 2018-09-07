import styled, { css } from 'styled-components';

interface IButton {
  big?: boolean;
  modal?: boolean;
  modalSecondary?: boolean;
}

const Button = styled.button<IButton>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: white;
  background-color: #64B5F6;
  background: linear-gradient(to right, #64B5F6, #82B1FF);
  border: none;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(25, 118, 210, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    box-shadow: 0 4px 10px rgba(25, 118, 210, 0.4);
    transform: scale(1.01, 1.01) translateY(-2px) translateZ(0);
  }

  ${({ big }) =>
    big &&
    css`
      padding: 11px 24px;
    `}

  ${({ modal }) =>
    modal &&
    css`
      padding: 16px 32px;
      font-size: 16px;
      border-radius: 8px;
    `}

  ${({ modalSecondary }) =>
    modalSecondary &&
    css`
      padding: 14px 28px;
      font-size: 15px;
      border-radius: 8px;
      color: #707070;
      background: linear-gradient(to right, #d5d5d5, #dddddd);
      box-shadow: 0 3px 6px rgba(50, 50, 50, 0.1);

      :hover,
      :focus {
        box-shadow: 0 4px 10px rgba(50, 50, 50, 0.1);
      }
    `}
`;

export default Button;
