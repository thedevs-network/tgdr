import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

interface ITitle {
  small?: boolean;
}

export const Title = styled.h2<ITitle>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0 12px;
  padding: 0;
  font-size: 26px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;

  :after {
    content: "";
    position: absolute;
    right: 0;
    height: 100%;
    width: 16px;
    display: block;
    background: linear-gradient(to left, white, transparent);
  }

  ${({ small }) =>
    small &&
    css`
      font-size: 16px;
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


export const SloganTitle = styled.h2`
  margin: 8px 0;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  color: #808080;
`;

export const SloganSubTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: normal;
  color: #a8a8a8;
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

export const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64b5f6;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    color: #42a5f5;
    transform: scaleX(1.01) translateX(-4px);

    svg path {
      fill: #42a5f5;
    }
  }
`;

export const FooterLink = styled.a`
  font-size: 13px  ;
  color: #7990A2;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  
  :hover {
    color: #63B3F3;
  }
`;