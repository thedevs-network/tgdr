import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Label } from '../../Typography';
import { IInput } from '..';

const TextareaInput = styled.textarea`
  width: 100%;
  display: flex;
  padding: 16px;
  border: 1px solid #DCDCDC;
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
    border-color: #BBB;
    background-color: transparent;
  }

  ::placeholder {
    font-size: 14px;
    font-style: italic;
    color: #B8B8B8;
    opacity: 1;
  }
`;

interface ITeaxtarea extends IInput {
  rows?: number;
  smallLabel?: boolean;
}

const Textarea: React.SFC<ITeaxtarea> = ({
  label,
  name,
  placeholder,
  rows,
  smallLabel,
  ...props
}) => (
    <Flex flexDirection="column" flex="1 1 0" {...props}>
      <Label smallLabel={smallLabel}>{label}</Label>
      <TextareaInput name={name} placeholder={placeholder} rows={rows} />
    </Flex>
  );

Textarea.defaultProps = {
  rows: 6,
  smallLabel: false,
};

export default Textarea;