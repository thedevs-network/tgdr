import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { ifProp } from 'styled-tools';
import media from 'styled-media-query';
import { InputErrorMessage, Label } from '../../Typography';
import { IInput } from '..';

const InputWrapper = styled(Flex)`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  color: #888;
  border: 1px solid ${ifProp({ hasError: true }, '#E57373', '#DCDCDC')};
  border-radius: 8px;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;

  ${({ prepend }: { prepend?: boolean }) =>
    prepend &&
    css`
      padding-left: 58px;
    `};

  ::placeholder {
    font-size: 16px;
    font-style: italic;
    color: #b8b8b8;
  }

  :focus {
    background: transparent;
    border-color: 1px solid ${ifProp({ hasError: true }, '#E57373', '#BBB')};
  }

  ${media.lessThan('470px')`
    height: 44px;
    padding: 0 10px;
    font-size: 15px;

    ::placeholder {
      font-size: 15px;
    }

    ${({ prepend }: { prepend?: boolean }) =>
      prepend &&
      css`
        padding-left: 48px;
      `};
  `};
`;

const Prepend = styled.span`
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  font-size: 18px;
  color: #aaa;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #eaeaea;

  ${media.lessThan('470px')`
    padding: 0 12px;
    font-size: 16px;
  `};
`;

const TextInput: React.SFC<IInput> = props => {
  const {
    input,
    label,
    meta,
    name,
    placeholder,
    prepend,
    ...restProps
  } = props;
  const hasError = meta.touched && meta.error;
  const errorMessage = hasError && (
    <InputErrorMessage>{meta.error}</InputErrorMessage>
  );

  return (
    <Flex flexDirection="column" flex="1 1 0" {...restProps}>
      <Label>{label}</Label>
      <InputWrapper>
        {prepend && <Prepend>{prepend}</Prepend>}
        <Input
          name={name}
          placeholder={placeholder}
          {...input}
          hasError={!!hasError}
          prepend={!!prepend}
        />
      </InputWrapper>
      {errorMessage}
    </Flex>
  );
};

export default TextInput;
