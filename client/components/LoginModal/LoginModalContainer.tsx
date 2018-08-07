import * as React from 'react';
import { connect } from 'react-redux';
import { Flex } from 'grid-styled';
import LoginModal from './LoginModal';
import MessageModal from '../MessageModal';
import { login } from '../../store/auth';
import Spinner from '../elements/Spinner';
import { IAppState } from '../../store';
import { IAuthState } from '../../store/auth/types';


interface IReduxState {
  auth: IAuthState;
}

interface IProps {
  auth: IAuthState;
  closeModal: () => void;
  login: typeof login;
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
    this.checkIframeLoaded();
  }

  checkIframeLoaded() {
    const iframe = document.querySelector('iframe');
    if (!iframe) return setTimeout(this.checkIframeLoaded, 200);
    iframe.addEventListener('load', () =>
      this.setState({ isIframeLoading: false }));
  }

  handleLogin(data) {
    this.props.login(data);
  }

  render() {
    const { isIframeLoading } = this.state;
    const { auth, closeModal } = this.props;

    if (auth.isLoading) {
      return (
        <Flex justify="center" my={4}>
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

const mapStateToProps = ({ auth }: IAppState): IReduxState => ({ auth });

export default connect<IReduxState>(mapStateToProps, { login })(LoginModalContainer);