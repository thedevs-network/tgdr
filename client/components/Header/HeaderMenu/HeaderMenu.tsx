import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import LoginModal from '../../LoginModal';
import SubmitModal from '../../SubmitModal';
import Icon from '../../elements/Icon';
import Spinner from '../../elements/Spinner';

const A = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #686868;
  text-decoration: none;
  transition: color 0.3s ease-out;

  :hover,
  :active,
  :focus {
    color: #64B5F6;

    svg path {
      stroke: #64B5F6;
    }
  }
`;

interface IProps {
  isLogoutLoading: boolean;
  logout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  name: string;
}

const HeaderMenu: React.SFC<IProps> = ({ isLogoutLoading, logout, name }) => {
  let logoutLink;
  let authLink;

  if (isLogoutLoading) {
    logoutLink = <Spinner size={16} />;
  } else {
    logoutLink = (
      <A href="#" title="Logout" onClick={logout}>
        {name},
        <Icon name="logout" size={14} fill="transparent" stroke="#666" ml={2} />
      </A>
    );
  }

  if (name) {
    authLink = logoutLink;
  } else {
    authLink = (
      <Modal
        trigger={(
          <A href="#" title="Login or sign up">
            Login / Sign Up
          </A>
        )}>
        {closeModal => <LoginModal closeModal={closeModal} />}
      </Modal>
    );
  }

  return (
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
        {authLink}
      </Box>
    </Flex>
  );
};

export default HeaderMenu;
