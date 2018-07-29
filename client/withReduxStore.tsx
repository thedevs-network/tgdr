import * as React from 'react';
import { NextContext } from 'next';
import { initializeStore } from './store';

interface IApp extends React.ComponentClass<any, any> {
  getInitialProps?: (ctx: NextContext) => Promise<any>;
}

const isServer: boolean = typeof window === 'undefined';
const __NEXT_REDUX_STORE__: '__NEXT_REDUX_STORE__' = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState?: {}) {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const withReduxStore = (App: IApp) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    reduxStore: {};
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;