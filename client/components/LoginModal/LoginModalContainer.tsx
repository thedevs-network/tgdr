import * as React from 'react';
import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import LoginModal from './LoginModal';
import MessageModal from '../MessageModal';
import { login } from '../../store/auth';
import Spinner from '../elements/Spinner';
import { IAppState } from '../../store';
import { IAuthState, loginClear } from '../../store/auth';

interface IReduxStateProps {
  auth: IAuthState;
}

interface IReduxDispatchProps {
  login: typeof login;
  loginClear: typeof loginClear;
}

interface IProps extends IReduxStateProps, IReduxDispatchProps {
  closeModal: () => void;
}

interface IState {
  isIframeLoading: boolean;
}

class LoginModalContainer extends React.Component<IProps, IState> {
  state: IState;
  constructor(props) {
    super(props);

    this.state = {
      isIframeLoading: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.checkIframeLoaded = this.checkIframeLoaded.bind(this);
  }

  componentDidMount() {
    this.props.loginClear();
    this.checkIframeLoaded();
  }

  checkIframeLoaded() {
    const iframe = document.querySelector('iframe');
    if (!iframe) return setTimeout(this.checkIframeLoaded, 200);
    iframe.addEventListener('load', () =>
      this.setState({ isIframeLoading: false })
    );
  }

  handleLogin(data) {
    this.props.login(data);
  }

  render() {
    const { isIframeLoading } = this.state;
    const { auth, closeModal } = this.props;

    if (auth.isLoading) {
      return (
        <Flex justifyContent="center" my={4}>
          <Spinner size={32} />
        </Flex>
      );
    }

    if (auth.isFetched) {
      return (
        <MessageModal
          closeModal={closeModal}
          text={auth.message.text}
          title={auth.message.title}
          type={auth.message.type}
        />
      );
    }

    return (
      <LoginModal
        handleLogin={this.handleLogin}
        isIframeLoaded={isIframeLoading}
      />
    );
  }
}

const mapStateToProps = ({ auth }: IAppState): IReduxStateProps => ({ auth });

export default connect<IReduxStateProps, IReduxDispatchProps>(
  mapStateToProps,
  { login, loginClear }
)(LoginModalContainer);
