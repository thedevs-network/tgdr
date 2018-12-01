import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import nprogress from 'nprogress';
import withReduxStore from '../client/withReduxStore';
import {
  authenticateUser,
  decodeToken,
  renewToken,
} from '../client/store/auth';
import { IReduxStore } from '../client/store';
import { setActiveTags } from '../client/store/tags';
import 'normalize.css';
import '../client/assets/css/nprogress.css';
import config from '../client.config';
import { initGA, logPageView } from '../client/utils';

interface IProps {
  reduxStore?: IReduxStore;
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }) {
    const reduxStore: IReduxStore = ctx.reduxStore;

    const { cookies = {} } = ctx.req || {};
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

    // Set active tags
    const activeTags = window.location.pathname.split('/');
    reduxStore.dispatch(setActiveTags(activeTags));

    // Set analytics
    if (config.GOOGLE_ANALYTICS_ID) {
      if (!(window as any).GA_INITIALIZED) {
        initGA();
        (window as any).GA_INITIALIZED = true;
      }
      logPageView();
    }

    nprogress.done();

    Router.events.on('routeChangeStart', () => nprogress.start());
    Router.events.on('routeChangeComplete', () => {
      nprogress.done();
      const newActiveTags = window.location.pathname.split('/');
      reduxStore.dispatch(setActiveTags(newActiveTags));
      logPageView();
    });
    Router.events.on('routeChangeError', () => nprogress.done());
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:description"
            content="Top Telegram Channles, Bots and Groups"
          />
          <meta
            name="og:description"
            content="Top Telegram Channles, Bots and Groups"
          />
          <meta name="og:site_name" content="Telegram Directory" />
          <meta name="og:type" content="website" />
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </>
    );
  }
}

export default withReduxStore(MyApp);
