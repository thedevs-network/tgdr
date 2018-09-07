import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Container } from '../elements/Layout';
import Logo from '../elements/Logo';
import HeaderMenu from './HeaderMenu';

const HeaderWrapper = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
})`
  background-color: white;
  height: 80px;
  box-shadow: 0 3px 5px rgba(160, 160, 160, 0.1);
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper is="header">
        <Container align="center" justify="space-between">
          <Logo />
          <HeaderMenu />
        </Container>
      </HeaderWrapper>
    );
  }
}

export default Header;
