import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import LoginModal from '../../LoginModal';
import SubmitModal from '../../SubmitModal';
import Icon from '../../elements/Icon';
import Spinner from '../../elements/Spinner';
import { IAuthState } from '../../../store/auth';

const Name = styled.span`
  padding-right: 16px;
  font-size: 14px;
  color: #888;
`;

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
    color: #64b5f6;

    svg path {
      stroke: #64b5f6;
    }
  }
`;

interface IProps {
  isLogoutLoading: boolean;
  logout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  name: IAuthState['name'];
  isAuthenticated: IAuthState['isAuthenticated'];
}

const HeaderMenu: React.SFC<IProps> = ({
  isAuthenticated,
  isLogoutLoading,
  logout,
  name,
}) => {
  let logoutLink;
  let authLink;

  if (isLogoutLoading) {
    logoutLink = <Spinner size={16} />;
  } else {
    logoutLink = (
      <A href="#" title="Logout" onClick={logout}>
        <Icon name="logout" size={14} fill="transparent" stroke="#666" mr={1} />
        Log out
      </A>
    );
  }

  if (isAuthenticated) {
    authLink = logoutLink;
  } else {
    authLink = (
      <Modal
        trigger={
          <A href="#" title="Login or sign up">
            Login / Sign Up
          </A>
        }
      >
        {closeModal => <LoginModal closeModal={closeModal} />}
      </Modal>
    );
  }

  const showSubmitButton = closeModal =>
    isAuthenticated ? (
      <SubmitModal closeModal={closeModal} />
    ) : (
      <LoginModal closeModal={closeModal} />
    );

  return (
    <Flex align="center" is="nav">
      <Box mx={3}>
        <Modal trigger={<Button>+ Submit</Button>}>{showSubmitButton}</Modal>
      </Box>
      <Flex ml={2} align="center">
        {name && <Name>{name},</Name>}
        {authLink}
      </Flex>
    </Flex>
  );
};

export default HeaderMenu;
