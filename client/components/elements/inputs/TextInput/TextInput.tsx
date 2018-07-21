import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Label } from '../../Typography';
import { IInput } from '..';

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  color: #888;
  border: 1px solid #DCDCDC;
  border-radius: 8px;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;

  ::placeholder {
    font-size: 16px;
    font-style: italic;
    color: #B8B8B8;
  }

  :focus {
    background: transparent;
    border-color: #BBB;
  }
`;


const TextInput: React.SFC<IInput> = ({ label, name, placeholder, ...props }) => (
  <Flex flexDirection="column" flex="1 1 0" {...props}>
    <Label>{label}</Label>
    <Input name={name} placeholder={placeholder} />
  </Flex>
);

export default TextInput;