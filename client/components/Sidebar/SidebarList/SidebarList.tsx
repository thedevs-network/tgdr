import * as React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { Flex } from 'grid-styled';
import media from 'styled-media-query';
import { ICategories } from '../../../../constants/categories';
import Icon from '../../elements/Icon';

const Title = styled.h4`
  font-size: 13px;
  color: #707070;
  padding: 0;
  margin: 0 0 16px 0;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  :last-child {
    margin-bottom: 0;
  }
`;

interface ILinkProps {
  isActive: boolean;
}

const ListLink = styled.a<ILinkProps>`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.04em;
  color: #888;
  transition: color 0.3s ease-out;
  cursor: pointer;

  span {
    transition: transform 0.2s ease-out;
    transform: translateZ(0);
  }

  :hover,
  :active {
    color: #333;

    span {
      transform: translateX(3px);
    }

    svg path {
      fill: #999fa5;
    }
  }

  ${ifProp(
    'isActive',
    css`
      color: #111;

      span {
        transform: translateX(3px);
      }

      svg path {
        fill: #6d7277;
      }
    `
  )};

  ${media.lessThan('470px')`
    letter-spacing: 0;
  `}
`;

const Count = styled.span`
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #acb5bc;
`;

interface ISidebarList {
  actives: string[];
  title: string;
  data: ICategories[];
  queryName: 'category' | 'type';
}

const SidebarList: React.SFC<ISidebarList> = ({
  actives,
  title,
  data,
  queryName,
}) => (
  <Flex flexDirection="column" flex="1 1 auto" is="nav">
    <Title>{title}</Title>
    <List>
      {data.map(item => (
        <ListItem key={item.slug}>
          <Link
            as={`/${item.slug}`}
            href={`/?${queryName}=${item.slug}`}
            passHref
            scroll={false}
          >
            <ListLink isActive={actives.includes(item.slug)} title={item.name}>
              <Icon
                name={item.icon || 'chevronRight'}
                mr={3}
                size={item.icon ? 16 : 6}
              />
              <span>{item.name}</span>
            </ListLink>
          </Link>
          <Count>{item.count}</Count>
        </ListItem>
      ))}
    </List>
  </Flex>
);

export default SidebarList;
