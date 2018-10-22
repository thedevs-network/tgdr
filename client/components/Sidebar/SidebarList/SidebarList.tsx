import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
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

const ListLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.04 em;
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
`;

const Count = styled.span`
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #acb5bc;
`;

interface ISidebarList {
  title: string;
  data: ICategories[];
}

const SidebarList: React.SFC<ISidebarList> = ({ title, data }) => (
  <Flex flexDirection="column" flex="1 1 auto">
    <Title>{title}</Title>
    <List>
      {data.map(item => (
        <ListItem key={item.slug}>
          <Link href={`/${item.slug}`} passHref>
            <ListLink title={item.name}>
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
