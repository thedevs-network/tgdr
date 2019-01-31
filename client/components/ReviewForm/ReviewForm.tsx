import * as React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import Textarea from '../elements/inputs/Textarea';

const Button = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: 16px;
  padding: 6px 18px;
  border: 2px solid #d3d3d3;
  border-radius: 28px;
  background-color: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    color: white;
    background-color: #888;
    border-color: #888;
    transform: scale(1.04, 1.04) translateY(-2px) translateZ(0);
  }
`;

interface IProps {
  submitting: boolean;
  onSubmit(values: any): Promise<any>;
}

const ReviewForm: React.SFC<IProps> = ({ submitting, onSubmit }) => (
  <Flex
    flexDirection="column"
    flex="1 1 auto"
    as="form"
    mb={3}
    onSubmit={onSubmit}
  >
    <Field
      label="Write a review"
      name="text"
      placeholder="A helpful and informative review"
      component={Textarea}
      smallLabel
    />
    <Button disabled={submitting}>
      {submitting ? 'Submitting...' : 'Submit'}
    </Button>
  </Flex>
);

export default ReviewForm;
