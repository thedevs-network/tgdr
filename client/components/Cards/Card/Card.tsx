import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import CardJoinButton from './CardJoinButton';
import CardPhoto from './CardPhoto';
import CardTitle from './CardTitle';
import CardMembersCount from './CardMembersCount';
import CardRate from './CardRate';
import { LightBox } from '../../elements/Layout';

const CardWrapper = styled(LightBox).attrs({
  align: "center",
  flex: "1 1 auto",
  mb: [3],
  mr: [3],
  p: 3,
  width: [4 / 12],
})`
  cursor: pointer;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  transform: translateZ(0);

  :hover {
    transform: scale(1.02, 1.02) translateY(-4px);
    box-shadow: 0 20px 35px rgba(50, 64, 93, 0.12);
  }
`;

const Card = () => (
  <CardWrapper>
    <CardPhoto />
    <Flex flexDirection="column" flex="1 1 auto">
      <CardTitle>
        The Devs
      </CardTitle>
      <CardMembersCount>
        14871 members
      </CardMembersCount>
      <Flex align="center" justify="space-between" mt={2}>
        <CardRate />
        <CardJoinButton />
      </Flex>
    </Flex>
  </CardWrapper>
);

export default Card;
