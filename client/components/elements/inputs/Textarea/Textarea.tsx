import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { ifProp } from 'styled-tools';
import { InputErrorMessage, Label } from '../../Typography';
import { IInput } from '..';

const TextareaInput = styled.textarea`
  width: 100%;
  display: flex;
  padding: 16px;
  border: 1px solid ${ifProp({ hasError: true }, '#E57373', '#DCDCDC')};
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.03em;
  color: #888;
  box-sizing: border-box;
  background-color: transparent;
  transition: border-color 0.2s ease-out;

  :focus {
    border-color: ${ifProp({ hasError: true }, '#E57373', '#BBB')};

    background-color: transparent;
  }

  ::placeholder {
    font-size: 14px;
    font-style: italic;
    color: #b8b8b8;
    opacity: 1;
  }
`;

interface ITeaxtarea extends IInput {
  rows?: number;
  smallLabel?: boolean;
}

const Textarea: React.SFC<ITeaxtarea> = props => {
  const {
    label,
    name,
    placeholder,
    rows,
    smallLabel,
    input,
    meta,
    ...restProps
  } = props;

  const hasError = meta && meta.touched && meta.error;
  const errorMessage = hasError && (
    <InputErrorMessage>{meta.error}</InputErrorMessage>
  );

  return (
    <Flex flexDirection="column" flex="1 1 auto" {...restProps}>
      <Label smallLabel={smallLabel}>{label}</Label>
      <TextareaInput
        {...input}
        hasError={!!hasError}
        name={name}
        placeholder={placeholder}
        rows={rows}
      />
      {errorMessage}
    </Flex>
  );
};

Textarea.defaultProps = {
  rows: 6,
  smallLabel: false,
};

export default Textarea;
