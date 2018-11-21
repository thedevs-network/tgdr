import * as React from 'react';
import { Flex } from 'grid-styled';
import Link from 'next/link';
import media from 'styled-media-query';
import { Container } from '../elements/Layout';
import Logo from '../elements/Logo';
import { FooterLink } from '../elements/Typography';
import styled from 'styled-components';
import Icon from '../elements/Icon';

const List = styled(Flex).attrs({
  align: 'center',
  is: 'ul',
})`
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;

  ${media.lessThan('470px')`
    margin-top: 16px;
  `};
`;

const ListItem = styled(Flex).attrs({
  align: 'center',
  is: 'li',
})`
  margin: 0;
  padding: 0 13px 0;
  list-style: none;

  :last-child {
    padding-right: 0;
  }

  span {
    display: flex;
  }

  ${media.lessThan('470px')`
    padding: 0 8px 0;
  `};
`;

const Separator = styled.span`
  font-size: 14px;
  color: #d6dde2;

  ${media.lessThan('470px')`
    font-size: 13px;
  `};
`;

const Footer: React.SFC = () => (
  <Flex
    align="center"
    justify="center"
    is="footer"
    pb={4}
    pt={[5, 6]}
    flex="0 0 0"
  >
    <Container
      align="center"
      justify="space-between"
      flexDirection={['column', 'row']}
    >
      <Logo />
      <List>
        <ListItem>
          <Link href="/terms" as="/terms" passHref>
            <FooterLink>Terms</FooterLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/privacy-policy" as="/privacy-policy" passHref>
            <FooterLink>Privacy Policy</FooterLink>
          </Link>
        </ListItem>
        <ListItem>
          <Separator>|</Separator>
        </ListItem>
        <ListItem>
          <a href="https://t.me/tgdr_io" title="Telegram">
            <Icon
              size={14}
              name="telegram"
              fill="#7990A2"
              hoverFill="#63B3F3"
            />
          </a>
        </ListItem>
        <ListItem>
          <a href="https://twitter.com/tgdr_io" title="Twitter">
            <Icon size={16} name="twitter" fill="#7990A2" hoverFill="#63B3F3" />
          </a>
        </ListItem>
        <ListItem>
          <a href="mailto:support@tgdr.io" title="Contact Email">
            <Icon
              size={16}
              name="envelope"
              fill="#7990A2"
              hoverFill="#63B3F3"
            />
          </a>
        </ListItem>
        <ListItem>
          <a
            className="github-button"
            href="https://github.com/thedevs-network/telegram-directory"
            data-show-count="true"
            aria-label="Star thedevs-network/telegram-directory on GitHub"
          >
            Star
          </a>
        </ListItem>
      </List>
    </Container>
  </Flex>
);

export default Footer;
