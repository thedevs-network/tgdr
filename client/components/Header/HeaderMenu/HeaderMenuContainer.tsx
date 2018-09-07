import * as React from 'react';
import { connect } from 'react-redux';
import HeaderMenu from './HeaderMenu';
import { IAppState } from '../../../store';
import { logout } from '../../../store/auth/authActions';
import { IAuthState } from '../../../store/auth';

interface IProps {
  logout: typeof logout;
  auth: IAuthState;
}

interface IStoreProps {
  auth: IAuthState;
}

interface IState {
  isLogoutLoading: boolean;
}

class HeaderMenuContainer extends React.Component<IProps, IState> {
  state: IState;
  constructor(props) {
    super(props);
    this.state = {
      isLogoutLoading: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const { logout: logoutUser } = this.props;
    this.setState({ isLogoutLoading: true }, () => {
      setTimeout(() => {
        logoutUser();
        this.setState({ isLogoutLoading: false });
      }, 500);
    });
  }

  render() {
    return (
      <HeaderMenu
        isAuthenticated={this.props.auth.isAuthenticated}
        isLogoutLoading={this.state.isLogoutLoading}
        logout={this.logout}
        name={this.props.auth.name}
      />
    );
  }
}

const mapStateToProps = ({ auth }: IAppState): IStoreProps => ({ auth });

export default connect<IStoreProps>(
  mapStateToProps,
  { logout }
)(HeaderMenuContainer);
