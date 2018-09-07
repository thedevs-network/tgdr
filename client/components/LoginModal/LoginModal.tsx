import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Divider from '../elements/Divider';
import TelegramLoginButton from 'react-telegram-login';
import Spinner from '../elements/Spinner';

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: #808080;
`;

interface ILoginModal {
  handleLogin: (res: any) => void;
  isIframeLoaded: boolean;
}

const LoginModal: React.SFC<ILoginModal> = ({
  isIframeLoaded,
  handleLogin,
}) => {
  const loader = isIframeLoaded && (
    <Flex justify="center" mt={4} width={1}>
      <Spinner size={32} />
    </Flex>
  );

  return (
    <Flex flexDirection="column" flex="1 1 auto">
      <Title>You can use your Telegram account to login.</Title>
      <Divider my={3} />
      <Flex flexDirection="column" align="center">
        <TelegramLoginButton dataOnauth={handleLogin} botName="tgdrbot" />
      </Flex>
      {loader}
    </Flex>
  );
};

export default LoginModal;
