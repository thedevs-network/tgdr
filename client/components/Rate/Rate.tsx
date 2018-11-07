import * as React from 'react';
import { Flex } from 'grid-styled';
import RateButton from './RateButton';

interface IProps {
  isAuthenticated: boolean;
  disliked: boolean;
  dislikes: number;
  liked: boolean;
  likes: number;
  onRate(type: 'liked' | 'disliked'): (e: any) => any;
}

const Rate: React.SFC<IProps> = ({
  isAuthenticated,
  liked,
  likes,
  disliked,
  dislikes,
  onRate,
}) => (
  <Flex mt={3} justify="space-between" width={1} px="4px">
    <RateButton
      type="like"
      count={likes}
      isActive={liked}
      isAuthenticated={isAuthenticated}
      onClick={onRate('liked')}
    />
    <RateButton
      type="dislike"
      count={dislikes}
      isActive={disliked}
      isAuthenticated={isAuthenticated}
      onClick={onRate('disliked')}
    />
  </Flex>
);

export default Rate;
