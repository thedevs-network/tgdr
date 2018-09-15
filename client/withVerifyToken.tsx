import * as React from 'react';
import { NextSFC } from 'next';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import { renewToken } from './store/auth';

interface IProps {
  isAuthenticated: boolean;
  renewToken: typeof renewToken;
}

const withVerifyToken = (Page: NextSFC) => {
  class WithVerifyToken extends React.Component<IProps> {
    static getInitialProps(ctx) {
      if (Page.getInitialProps) {
        return Page.getInitialProps(ctx);
      }
      return {};
    }

    componentDidMount() {
      const { isAuthenticated, renewToken: renew } = this.props;
      if (isAuthenticated) return null;

      const token = Cookie.get('token');
      if (token) {
        renew(token);
      }
    }

    render() {
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
