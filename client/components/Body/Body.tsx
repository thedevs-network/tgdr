import * as React from 'react';
import { Flex } from '@rebass/grid'
import Header from '../Header';
import Slogan from '../Slogan';
import { Container } from '../elements/Layout';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const Body: React.SFC = ({ children }) => (
  <>
    <Header />
    <Slogan />
    <Flex justifyContent="center">
      <Container
      alignItems="flex-start"
      flexDirection={['column', 'column', 'row']}>
        <Sidebar />
        <Flex width={[1, 1, 9 / 12]} flexDirection="column" as="main">
          {children}
        </Flex>
      </Container>
    </Flex>
    <Footer />
  </>
);

export default Body;
