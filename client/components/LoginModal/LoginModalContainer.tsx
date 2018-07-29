import * as React from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import MessageModal from '../MessageModal';
import { login } from '../../store/auth';

interface IProps {
  closeModal: () => void;
  login: typeof login;
}

interface IState {
  isLoading: boolean;
}

class LoginModalContainer extends React.Component<IProps, IState> {
  isLoading: boolean;
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.props.login(data);
  }

  render() {
    if (false) {
      return (
        <MessageModal
          closeModal={this.props.closeModal}
          text="You have logged in successfully."
          title="Welcom, Pouria!"
          type="success"
        />
      );
    }

    return (
      <LoginModal handleLogin={this.handleLogin} />
    );
  }
}

export default connect(null, { login })(LoginModalContainer);