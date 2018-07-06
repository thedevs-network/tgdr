import * as React from 'react';
import { Flex } from 'grid-styled';
import Header from './components/Header';
import Slogan from './components/Slogan';
import { Container } from './components/elements/Layout';
import Sidebar from './components/Sidebar';

/* 
  An HOC to retun the component with header, sidebar and footer around it.
*/

const withBody = (Component: React.ComponentType) => {
  class WithBody extends React.Component {
    public render() {
      return (
        <>
          <Header />
          <Slogan />
          <Flex justify="center">
            <Container mb={6}>
              <Sidebar />
              <Flex width={[9 / 12]}>
                <Component {...this.props} />
              </Flex>
            </Container>
          </Flex>
        </>
      );
    }
  }

  return WithBody;
};

export default withBody;
