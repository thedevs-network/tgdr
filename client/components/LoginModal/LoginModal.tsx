import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Divider from '../elements/Divider';
import TelegramLoginButton from 'react-telegram-login';

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #808080;
`;

interface ILoginModal {
  handleLogin: (res: any) => void;
}

const LoginModal: React.SFC<ILoginModal> = ({ handleLogin }) => (
  <Flex flexDirection="column" flex="1 1 auto">
    <Title>
      You can use your Telegram account to login.
    </Title>
    <Divider my={3} />
    <Flex flexDirection="column" align="center">
      <TelegramLoginButton dataOnauth={handleLogin} botName="tgdrbot" />
    </Flex>
  </Flex>
);

export default LoginModal;