import styled from 'styled-components';
import Icon from '../../Icon';

const SearchInputIcon = styled(Icon).attrs({
  name: 'search',
  size: 14,
})`
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

export default SearchInputIcon;