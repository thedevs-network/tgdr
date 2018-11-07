import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Label } from '../elements/Typography';

const Message = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0;
  padding: 0;
`;

const ReviewForm: React.SFC = () => (
  <Flex flexDirection="column" flex="1 1 auto" mb={5}>
    <Label smallLabel>Write a review</Label>
    <Message>
      You need to like or dislike this entry before submitting a review.
    </Message>
  </Flex>
);

export default ReviewForm;
