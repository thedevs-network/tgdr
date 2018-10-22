import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../client/withReduxStore';
import {
  authenticateUser,
  decodeToken,
  renewToken,
} from '../client/store/auth';
import { IReduxStore } from '../client/store';

interface IProps {
  reduxStore?: IReduxStore;
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }) {
    const reduxStore: IReduxStore = ctx.reduxStore;
    const { cookies } = ctx.req;
    const { isAuthenticated } = reduxStore.getState().auth;

    // Authenticate user and save token to redux store
    if (!isAuthenticated && cookies.token) {
      reduxStore.dispatch(
        authenticateUser({
          ...decodeToken(cookies.token),
          token: cookies.token,
        })
      );
    }

    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { Component, pageProps };
  }

  componentDidMount() {
    const { reduxStore } = this.props;
    const { isAuthenticated, isFetched } = reduxStore.getState().auth;

    // Renew token if token exists
    if (isAuthenticated && !isFetched) {
      reduxStore.dispatch(renewToken());
    }
  }

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
