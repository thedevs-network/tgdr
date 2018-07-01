import styled from 'styled-components';
import SearchIcon from '../../../../assets/images/search-icon.svg';

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  right: 8px;
  width: 14px;
  height: 14px;
  padding: 8px;
  fill: #888888;
  cursor: pointer;
  transition: fill 0.3s ease-out;

  :hover,
  :focus,
  :active {
    fill: #444;
  }
`;

export default SearchInputIcon;