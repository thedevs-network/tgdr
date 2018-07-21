import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Divider from '../elements/Divider';
import Icon from '../elements/Icon';
import Button from '../elements/Button';

const Title = styled.h2`
  margin: 0 0 8px;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: #808080;
`;

interface ILoginModal {
  closeModal: () => void;
}

const LoginModal: React.SFC<ILoginModal> = ({ closeModal }) => (
  <Flex flexDirection="column" flex="1 1 auto">
    <Title>
      You can use your Telegram account to login.
    </Title>
    <Divider my={3} />
    <Button onClick={closeModal} modal>
      <Icon name="telegram" fill="#f5f5f5" size={16} mr={3} />
      Login with Telegram
    </Button>
    <Flex mt={3} flexDirection="column">
      <Button onClick={closeModal} modalSecondary>
        Cancel
      </Button>
    </Flex>
  </Flex>
);

export default LoginModal;