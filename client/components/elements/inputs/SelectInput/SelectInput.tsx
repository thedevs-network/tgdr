import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { ifProp } from 'styled-tools';
import { InputErrorMessage, Label } from '../../Typography';
import { IInput } from '..';

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  color: #888;
  border: 1px solid ${ifProp({ hasError: true }, '#E57373', '#DCDCDC')};
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
    color: #b8b8b8;
  }

  :focus {
    background-color: transparent;
    border-color: 1px solid ${ifProp({ hasError: true }, '#E57373', '#BBB')};
  }
`;

interface ISelectInput extends IInput {
  options: Array<{
    key: string;
    value: string;
  }>;
}

const SelectInput: React.SFC<ISelectInput> = props => {
  const {
    label,
    name,
    placeholder,
    options,
    input,
    meta,
    ...restProps
  } = props;
  const hasError = meta.touched && meta.error;
  const errorMessage = hasError && (
    <InputErrorMessage>{meta.error}</InputErrorMessage>
  );

  return (
    <Flex flexDirection="column" flex="1 1 0" {...restProps}>
      <Label>{label}</Label>
      <Select name={name} {...input} hasError={!!hasError}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.key}
          </option>
        ))}
      </Select>
      {errorMessage}
    </Flex>
  );
};

export default SelectInput;
