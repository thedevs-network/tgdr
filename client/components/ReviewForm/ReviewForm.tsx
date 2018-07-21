import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Textarea from '../elements/inputs/Textarea';

const Button = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: 16px;
  padding: 6px 18px ;
  border: 2px solid #D3D3D3;
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

const ReviewForm: React.SFC = () => (
  <Flex flexDirection="column" is="form" mb={3}>
    <Textarea
      label="Write a review"
      name="review"
      placeholder="A helpful and informative review"
      smallLabel
    />
    <Button>
      Submit
    </Button>
  </Flex>
);

export default ReviewForm;