import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import SearchInput from '../elements/inputs/SearchInput';
import Hr from '../elements/Hr';
import SidebarList from './SidebarList';
import * as categories from '../../../constants/categories';

const SidebarWrapper = styled(Flex).attrs({
  flexDirection: 'column',
  mr: 4,
  p: 4,
  width: [3 / 12],
})`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 35px rgba(50, 64, 93, 0.08);
`;

const Sidebar: React.SFC = () => (
  <SidebarWrapper>
    <Flex mb={4}>
      <SearchInput />
    </Flex>
    <Flex>
      <SidebarList title="Types" data={categories.types} />
    </Flex>
    <Hr />
    <Flex>
      <SidebarList title="Categories" data={categories.categories} />
    </Flex>
  </SidebarWrapper>
);

export default Sidebar;