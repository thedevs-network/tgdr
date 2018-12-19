import * as React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Container } from '../elements/Layout';
import Logo from '../elements/Logo';
import HeaderMenu from './HeaderMenu';

const HeaderWrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  background-color: white;
  height: 80px;
  box-shadow: 0 3px 5px rgba(160, 160, 160, 0.1);
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper as="header">
        <Container alignItems="center" justifyContent="space-between">
          <Logo />
          <HeaderMenu />
        </Container>
      </HeaderWrapper>
    );
  }
}

export default Header;
