import * as React from 'react';
import { Flex } from 'grid-styled';
import SearchInput from '../elements/inputs/SearchInput';
import { LightBox } from '../elements/Layout';
import Divider from '../elements/Divider';
import SidebarList from './SidebarList';
import { ICategories } from '../../../constants/categories';

interface IProps {
  types: ICategories[];
  categories: ICategories[];
}

const Sidebar: React.SFC<IProps> = ({ categories, types }) => (
  <LightBox mr={4} p={4} width={[3 / 12]} flexDirection="column">
    <Flex mb={4}>
      <SearchInput />
    </Flex>
    <Flex>
      <SidebarList title="Types" data={types} />
    </Flex>
    <Divider />
    <Flex>
      <SidebarList title="Categories" data={categories} />
    </Flex>
  </LightBox>
);

export default Sidebar;
