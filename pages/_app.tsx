import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../client/withReduxStore';
import { Provider } from 'react-redux';

interface IProps {
  reduxStore?: any;
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);