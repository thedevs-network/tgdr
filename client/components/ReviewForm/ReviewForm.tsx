import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const Label = styled.label`
  margin-bottom: 16px;  
  font-size: 14px;
  font-weight: 500;
`;

const Textarea = styled.textarea.attrs({
  id: "review",
  name: "review",
  placeholder: "A helpful and informative review",
  rows: 6,
})`
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
  transition: border 0.2s ease-out;

  :focus {
    border: 1px solid #BBB;
    background-color: transparent;
  }

  ::placeholder {
    font-size: 14px;
    font-style: italic;
    color: #B8B8B8;
    opacity: 1;
  }
`;

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
    transform: scale(1.04, 1.04) translateY(-2px)
  }
`;

const ReviewForm: React.SFC = () => (
  <Flex flexDirection="column" is="form" mb={3}>
    <Label>Write a review</Label>
    <Textarea />
    <Button>
      Submit
    </Button>
  </Flex>
);

export default ReviewForm;