import * as React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Label, Link } from '../elements/Typography';

const Message = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0;
  padding: 0;
`;

const ReviewFormPlaceholder: React.SFC<{ username: string }> = ({ username }) => (
  <Flex flexDirection="column" flex="1 1 auto" mb={5}>
    <Label smallLabel>Write a review</Label>
    <Message>
      You need to like or dislike this entry before submitting a review.
      You can also submit a review using our Telegram bot:{" "}
      <Link 
        href={`https://t.me/tgdrbot?start=${username}`} 
        target="_blank" 
        rel="noopener noreferrer">
          t.me/tgdrbot?start={username}
      </Link>
    </Message>
  </Flex>
);

export default ReviewFormPlaceholder;
