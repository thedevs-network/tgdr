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
      <Container align="flex-start">
        <Sidebar />
        <Flex width={[9 / 12]} flexDirection="column">
          {children}
        </Flex>
      </Container>
    </Flex>
    <Footer />
  </>
);

export default Body;
