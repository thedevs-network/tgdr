import * as React from 'react';
import LoginModal from './LoginModal';
import MessageModal from '../MessageModal';

interface IProps {
  closeModal: () => void;
}

interface IState {
  isLoading: boolean;
}

class LoginModalContainer extends React.Component<IProps, IState> {
  public isLoading: boolean;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  public handleLogin() {
    this.setState({ isLoading: true });
  }

  public render() {
    if (true) {
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

export default LoginModalContainer;