import * as React from 'react';
import { NextSFC } from 'next';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import { renewToken } from './store/auth';
import { AppLoadingWrapper } from './components/elements/Layout';
import Spinner from '../client/components/elements/Spinner';

interface IProps {
  isAuthenticated: boolean;
  renewToken: typeof renewToken;
}

interface IState {
  isLoading: boolean;
}

const withVerifyToken = (Page: NextSFC) => {
  class WithVerifyToken extends React.Component<IProps, IState> {
    static getInitialProps(ctx) {
      if (Page.getInitialProps) {
        return Page.getInitialProps(ctx);
      }
      return {};
    }

    state: IState;
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    async componentDidMount() {
      const { isAuthenticated, renewToken: renew } = this.props;
      if (isAuthenticated) return null;

      const token = Cookie.get('token');
      if (token) {
        await renew(token);
      }
      this.setState({ isLoading: false });
    }

    render() {
      const { isLoading } = this.state;

      if (isLoading) {
        return (
          <AppLoadingWrapper>
            <Spinner size={36} />
          </AppLoadingWrapper>
        );
      }

      return <Page {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
    isAuthenticated,
  });

  return connect(
    mapStateToProps,
    { renewToken }
  )(WithVerifyToken);
};

export default withVerifyToken;
