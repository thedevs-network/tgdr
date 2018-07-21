import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Label } from '../../Typography';
import { IInput } from '..';

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  color: #888;
  border: 1px solid #DCDCDC;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;
  background-color: transparent;
  background-image: url('/static/images/chevron-down.svg');
  background-position: calc(100% - 16px) 14px;
  background-size: 18px;
  background-repeat: no-repeat;
  appearance: none;

  ::placeholder {
    font-size: 16px;
    font-style: italic;
    color: #B8B8B8;
  }

  :focus {
    background-color: transparent;
    border-color: #BBB;
  }
`;

interface ISelectInput extends IInput {
  options: Array<{
    key: string,
    value: string,
  }>;
}

const SelectInput: React.SFC<ISelectInput> = ({
  label,
  name,
  placeholder,
  options,
  ...props
}) => (
    <Flex flexDirection="column" flex="1 1 0" {...props}>
      <Label>{label}</Label>
      <Select name={name}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.key}
          </option>
        ))}
      </Select>
    </Flex>
  );

export default SelectInput;