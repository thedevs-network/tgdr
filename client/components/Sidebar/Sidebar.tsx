import * as React from 'react';
import { Flex } from 'grid-styled';
import SearchInput from '../elements/inputs/SearchInput';
import { LightBox } from '../elements/Layout';
import Hr from '../elements/Hr';
import SidebarList from './SidebarList';
import * as categories from '../../../constants/categories';

const Sidebar: React.SFC = () => (
  <LightBox mr={4} p={4} width={[3 / 12]} flexDirection="column">
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
  </LightBox>
);

export default Sidebar;