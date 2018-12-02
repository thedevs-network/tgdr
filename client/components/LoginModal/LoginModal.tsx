import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import TelegramLoginButton from 'react-telegram-login';
import Divider from '../elements/Divider';
import Spinner from '../elements/Spinner';
import config from '../../../client.config';

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
    <Flex justify="center" mt={[3, 4]} width={1}>
      <Spinner size={32} />
    </Flex>
  );

  return (
    <Flex flexDirection="column" flex="1 1 auto">
      <Title>You can use your Telegram account to login.</Title>
      <Divider my={[2, 3]} />
      <Flex flexDirection="column" align="center">
        <TelegramLoginButton
          dataOnauth={handleLogin}
          botName={config.LOGIN_BOT_USERNAME}
        />
      </Flex>
      {loader}
    </Flex>
  );
};

export default LoginModal;
