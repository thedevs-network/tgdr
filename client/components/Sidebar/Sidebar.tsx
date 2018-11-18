import SearchInput from '../elements/inputs/SearchInput';
import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { Box, Flex } from 'grid-styled';
import { LightBox } from '../elements/Layout';
import Divider from '../elements/Divider';
import SidebarList from './SidebarList';
import { ICategories } from '../../../constants/categories';
import Icon from '../elements/Icon';

interface IProps {
  actives: string[];
  categories: ICategories[];
  search: string;
  showMenu: boolean;
  types: ICategories[];
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  onMenuToggle(e: React.MouseEvent<HTMLAnchorElement>): void;
}

const MenuIcon = styled.a.attrs({
  href: '#',
  title: 'Toggle menu',
})`
  margin-left: 16px;

  ${media.greaterThan('840px')`
    display: none;
  `};
`;

const Sidebar: React.SFC<IProps> = ({
  actives,
  categories,
  types,
  search,
  showMenu,
  onSearchChange,
  onMenuToggle,
}) => (
    <LightBox
      mb={[3, 3, 0]}
      mr={[0, 0, 2, 4]}
      p={[16, 4]}
      width={[1, 1, 3 / 12]}
      flexDirection="column"
    >
      <Flex mb={[0, 0, 4]} align="center" justify="space-evenly">
        <SearchInput value={search} onChange={onSearchChange} />
        <MenuIcon onClick={onMenuToggle}>
          <Icon name="menu" size={30} stroke="#777" />
        </MenuIcon>
      </Flex>
      {showMenu && (
        <Box mt={[4, 4, 0]}>
          <Flex>
            <SidebarList
              actives={actives}
              title="Types"
              data={types}
              queryName="type"
            />
          </Flex>
          <Divider />
          <Flex>
            <SidebarList
              actives={actives}
              title="Categories"
              data={categories}
              queryName="category"
            />
          </Flex>
        </Box>
      )}
    </LightBox>
  );

export default Sidebar;
