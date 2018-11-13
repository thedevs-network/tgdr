import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const InputIcon = styled(Icon)`
  position: absolute;
  right: 8px;
  padding: 8px;

  path {
    fill: #888;
    transition: fill 0.3s ease-out;
  }
`;

const SearchInputIcon = () => <InputIcon name="search" size={14} />;

export default SearchInputIcon;
