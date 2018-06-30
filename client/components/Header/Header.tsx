import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Container } from '../elements/Layout';
import Logo from '../elements/Logo';
import HeaderMenu from './HeaderMenu';

const HeaderContainer = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
})`
  background-color: white;
  height: 80px;
  box-shadow: 0 3px 5px rgba(160, 160, 160, 0.1);
`;

class Header extends Component {
  public render() {
    return (
      <HeaderContainer>
        <Container align="center" justify="space-between" >
          <Logo />
          <HeaderMenu />
        </Container>
      </HeaderContainer>
    );
  }
}

export default Header;
