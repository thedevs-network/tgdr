import { CommonFieldInputProps } from 'redux-form';

export interface IInput extends Partial<WrappedFieldProps> {
  label: string;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mx?: number;
  my?: number;
  name: string;
  placeholder?: string;
  prepend?: string;
}
