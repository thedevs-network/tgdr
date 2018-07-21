import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import LoginModal from '../../LoginModal';
import SubmitModal from '../../SubmitModal';

const A = styled.a`
  font-size: 13px;
  color: #686868;
  text-decoration: none;
  transition: color 0.3s ease-out;

  :hover,
  :active,
  :focus {
    color: #64B5F6;
  }
`;

const HeaderMenu: React.SFC = () => (
  <Flex align="center" is="nav">
    <Box mx={3}>
      <Modal
        trigger={(
          <Button>
            + Submit
          </Button>
        )}>
        {closeModal => <SubmitModal closeModal={closeModal} />}
      </Modal>
    </Box>
    <Box ml={2}>
      <Modal
        trigger={(
          <A href="#" title="Login or sign up">
            Login / Sign Up
          </A>
        )}>
        {closeModal => <LoginModal closeModal={closeModal} />}
      </Modal>
    </Box>
  </Flex>
);

export default HeaderMenu;
