import { CommonFieldInputProps } from 'redux-form';

export interface IInput extends Partial<WrappedFieldProps> {
  label: string;
  mb?: number[] | number;
  ml?: number[] | number;
  mr?: number[] | number;
  mt?: number[] | number;
  mx?: number[] | number;
  my?: number[] | number;
  name: string;
  placeholder?: string;
  prepend?: string;
}
