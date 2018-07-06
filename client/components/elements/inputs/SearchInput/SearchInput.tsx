import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import SearchInputIcon from './SearchInputIcon';

const InputWrapper = styled(Flex).attrs({
  align: 'center',
  height: 40,
  width: 1,
})`
  position: relative;
`;

const Input = styled.input.attrs({
  type: 'text',
})`
  height: 40px;
  max-width: 100%;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin: 0;
  padding: 0 40px 0 16px;
  font-size: 14px;
  color: #666;
  background-color: #F2F2F2;
  border: none;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;

  :focus,
  :active {
    outline: none;
    border: none;
    background-color: #F0F0F0;
  }
  
  ::placeholder {
    font-style: italic;
    color: #888;    
  }
`;

const SearchInput: React.SFC = (props) => (
  <InputWrapper height={40} width={1} align="center">
    <Input placeholder="Search..." {...props} />
    <SearchInputIcon />
  </InputWrapper>
);

export default SearchInput;
