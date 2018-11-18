import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import media from 'styled-media-query';

interface ITitle {
  small?: boolean;
}

export const Title = styled.h2<ITitle>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: ${ifProp('small', 0, '12px')};
  padding: 0;
  font-size: ${ifProp('small', '16px', '26px')};
  font-weight: 500;
  color: #666;
  white-space: ${ifProp('small', 'nowrap', 'normal')};

  :after {
    content: '';
    position: absolute;
    right: 0;
    height: 100%;
    width: 16px;
    display: block;
    background: linear-gradient(to left, white, transparent);
  }

  ${media.lessThan('470px')`
    margin-bottom: ${ifProp('small', 0, '8px')};

    :after {
      display: none;
    }
  `};
`;

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #808080;

  ${media.lessThan('470px')`
    font-size: 15px;
  `};
`;

interface ILabel {
  smallLabel?: boolean;
}

export const Label = styled.label<ILabel>`
  margin-bottom: 8px;
  padding: 0;
  font-size: ${ifProp('smallLabel', '14px', '16px')};
  font-weight: 500;

  ${media.lessThan('470px')`
    margin-bottom: 6px;
    font-size: ${ifProp('smallLabel', '13px', '15px')};
  `};
`;

export const CheckboxLabel = styled.label`
  padding-left: 16px;
`;

export const InputErrorMessage = styled.small`
  padding-top: 4px;
  color: #f44336;
`;

interface ISlogan {
  textAlign?: 'center' | 'left' | 'right';
}

export const SloganTitle = styled.h2<ISlogan>`
  text-align: ${prop('textAlign', 'left')};
  margin: 8px 0;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  color: #808080;

  ${media.lessThan('medium')`
    font-size: 20px;
  `};
`;

export const SloganSubTitle = styled.h3<ISlogan>`
  text-align: ${prop('textAlign', 'left')};
  margin: 0;
  padding: 0 16px;
  font-size: 16px;
  font-weight: normal;
  color: #a8a8a8;

  ${media.lessThan('medium')`
    font-size: 15px;
  `};
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
  font-size: 13px;
  color: #7990a2;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;

  :hover {
    color: #63b3f3;
  }

  ${media.lessThan('470px')`
    font-size: 12px;
  `};
`;
