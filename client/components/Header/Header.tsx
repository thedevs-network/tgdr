import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Container } from '../elements/Layout';
import Logo from '../elements/Logo';
import Button from '../elements/Button';

const HeaderContainer = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
})`
  background-color: white;
  height: 80px;
  box-shadow: 0 3px 5px rgba(160, 160, 160, 0.1);
`;

const ContentContainer = Container.extend.attrs({
  align: 'center',
  justify: 'space-between',
})``;

class Header extends Component {
  public render() {
    return (
      <HeaderContainer>
        <ContentContainer>
          <Logo />
          <div>
            <Button>
              + Submit
            </Button>
          </div>
        </ContentContainer>
      </HeaderContainer>
    );
  }
}

export default Header;
