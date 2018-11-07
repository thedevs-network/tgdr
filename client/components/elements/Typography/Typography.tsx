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
  font-size: ${ifProp('smallLabel', '14px', '16px')};
  font-weight: 500;
  margin-bottom: 8px;
  padding: 0;
`;

export const CheckboxLabel = styled.label`
  padding-left: 16px;
`;

export const InputErrorMessage = styled.small`
  padding-top: 4px;
  color: #f44336;
`;

interface ILink {
  big?: boolean;
  secondary?: boolean;
  small?: boolean;
}

export const Link = styled.a<ILink>`
  font-size: ${ifProp('big', '16px', '14px')};
  color: ${ifProp('secondary', '#C7CFD6', '#63b3f3')};
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  ${ifProp(
    'small',
    css`
      font-size: 13px;
    `
  )};

  :hover,
  :focus {
    text-decoration: none;
    color: #42a5f5;
    transform: ${ifProp(
      'secondary',
      'translateZ(0)',
      'scaleX(1.01) translateX(-4px)'
    )};
  }
`;
