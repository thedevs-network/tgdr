import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const InputIcon = styled(Icon)`
  position: absolute;
  right: 8px;
  padding: 8px;
  cursor: pointer;

  path {
    fill: #888;
    transition: fill 0.3s ease-out;
  }

  :hover,
  :focus,
  :active {
    path {
      fill: #333;
    }
  }
`;

const SearchInputIcon = () => <InputIcon name="search" size={14} />;

export default SearchInputIcon;
