import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../elements/Icon';
import Divider from '../elements/Divider';

const Count = styled.h5`
  margin: 0 0 8px;
  padding: 0;
  font-size: 14;
  font-weight: 500;
`;

const Name = styled.h4`
  margin: 0 0 8px;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #C7CFD6;
`;

const Body = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #808080;
`;

const Link = styled.a`
  font-size: 14px;
  color: #63B3F3;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    text-decoration: none;
    color: #42A5F5;
    transform: scaleX(1.01) translateX(-4px);
  }
`;

const Reviews: React.SFC = () => (
  <>
    <Count>
      Reviews (203)
    </Count>
    <Flex align="flex-start" my={4}>
      <Icon name="heart" size={15} fill="#63B3F3" my={1} mx={3} />
      <Flex flexDirection="column" flex="1 1 auto">
        <Flex width={1} justify="space-between">
          <Name>Johny Doesm</Name>
          <ReviewDate> Feb 06, 2018</ReviewDate>
        </Flex>
        <Body>Tesla, reporting bigger loss, emphasizes gains in production and sales.</Body>
      </Flex>
    </Flex>
    <Divider my={0} />
    <Flex alignSelf="flex-end" mt={4}>
      <Link href="#" title="Load more review">
        + Load more
      </Link>
    </Flex>
  </>
);

export default Reviews;