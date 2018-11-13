import * as React from 'react';
import { Flex } from 'grid-styled';
import SearchInput from '../elements/inputs/SearchInput';
import { LightBox } from '../elements/Layout';
import Divider from '../elements/Divider';
import SidebarList from './SidebarList';
import { ICategories } from '../../../constants/categories';

interface IProps {
  search: string;
  actives: string[];
  categories: ICategories[];
  types: ICategories[];
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
}

const Sidebar: React.SFC<IProps> = ({
  actives,
  categories,
  types,
  search,
  onSearchChange,
}) => (
  <LightBox mr={4} p={4} width={[3 / 12]} flexDirection="column">
    <Flex mb={4}>
      <SearchInput value={search} onChange={onSearchChange} />
    </Flex>
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
  </LightBox>
);

export default Sidebar;
