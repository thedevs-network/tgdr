import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import SearchInput from '../elements/inputs/SearchInput';

const SidebarWrapper = styled(Flex).attrs({
  mr: 4,
  p: 4,
  width: [3 / 12],
})`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(13, 71, 161, 0.05);
`;

const Sidebar: React.SFC = () => (
  <SidebarWrapper>
    <SearchInput />
  </SidebarWrapper>
);

export default Sidebar;