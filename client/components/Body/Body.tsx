import * as React from 'react';
import { Flex } from 'grid-styled';
import Header from '../Header';
import Slogan from '../Slogan';
import { Container } from '../elements/Layout';
import Sidebar from '../Sidebar';

const Body: React.SFC = ({ children }) => (
  <>
    <Header />
    <Slogan />
    <Flex justify="center">
      <Container mb={6} align="flex-start">
        <Sidebar />
        <Flex width={[9 / 12]} flexDirection="column">
          {children}
        </Flex>
      </Container>
    </Flex>
  </>
);

export default Body;
