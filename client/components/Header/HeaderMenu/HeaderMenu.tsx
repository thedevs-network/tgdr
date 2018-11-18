import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import media from 'styled-media-query';
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

  ${media.lessThan('470px')`
    font-size: 13px;
    padding-right: 10px;
  `}
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

  ${media.lessThan('470px')`
    font-size: 13px;
  `}
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

  if (isAuthenticated && isLogoutLoading) {
    logoutLink = <Spinner size={16} />;
  } else if (isAuthenticated) {
    logoutLink = (
      <A href="#" title="Logout" onClick={logout}>
        <Icon name="logout" size={14} fill="transparent" stroke="#666" mr={1} />
        Log out
      </A>
    );
  }

  const login = (
    <Modal
      trigger={
        isAuthenticated ? null : (
          <A href="#" title="Login or sign up">
            Log in / Sign Up
          </A>
        )
      }
    >
      {closeModal => <LoginModal closeModal={closeModal} />}
    </Modal>
  );

  const showSubmit = closeModal =>
    isAuthenticated ? (
      <SubmitModal closeModal={closeModal} />
    ) : (
      <LoginModal closeModal={closeModal} />
    );

  return (
    <Flex
      align={['flex-end', 'center']}
      flexDirection={['column', 'row']}
      is="nav"
    >
      <Box mx={[0, 3]}>
        <Modal trigger={<Button responsive>+ Submit</Button>}>
          {showSubmit}
        </Modal>
      </Box>
      <Flex ml={[0, 2]} mt={[2, 0]} align={['flex-end', 'center']}>
        {name && <Name>{name},</Name>}
        {logoutLink}
        {login}
      </Flex>
    </Flex>
  );
};

export default HeaderMenu;
