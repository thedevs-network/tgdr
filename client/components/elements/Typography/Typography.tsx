import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

interface ITitle {
  small?: boolean;
}

export const Title = styled.h2<ITitle>`
  margin: 0 0 12px;
  padding: 0;
  font-size: 26px;
  font-weight: bold;
  color: #666;

  ${({ small }) =>
    small &&
    css`
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    `};
`;

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #808080;
`;

interface ILabel {
  smallLabel?: boolean;
}

export const Label = styled.label<ILabel>`
  font-size: ${ifProp({ smallLabel: true }, '14px', '16px')};
  font-weight: 500;
  margin-bottom: 8px;
  padding: 0;
`;

export const InputErrorMessage = styled.small`
  padding-top: 4px;
  color: #f44336;
`;
