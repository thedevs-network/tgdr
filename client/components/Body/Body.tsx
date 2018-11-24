import * as React from 'react';
import { Flex } from 'grid-styled';
import Header from '../Header';
import Slogan from '../Slogan';
import { Container } from '../elements/Layout';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const Body: React.SFC = ({ children }) => (
  <>
    <Header />
    <Slogan />
    <Flex justify="center">
      <Container align="flex-start" flexDirection={['column', 'column', 'row']}>
        <Sidebar />
        <Flex width={[1, 1, 9 / 12]} flexDirection="column" is="main">
          {children}
        </Flex>
      </Container>
    </Flex>
    <Footer />
  </>
);

export default Body;
