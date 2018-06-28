import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import * as LogoImage from '../../../assets/images/logo.png';

const Image = styled.img`
  transition: all 0.5s ease;

  :hover {
    opacity: 0.7;
  }
`;

const Logo: React.SFC = () => (
  <Link href="/" prefetch >
    <a title="Telegram Directory">
      <Image src={LogoImage} alt="Telegram Directory" />
    </a>
  </Link>
);

export default Logo;