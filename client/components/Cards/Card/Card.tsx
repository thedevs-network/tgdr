import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import CardJoinButton from './CardJoinButton';
import CardMembersCount from './CardMembersCount';
import CardRate from './CardRate';
import { Title } from '../../elements/Typography';
import Image from '../../elements/Image';
import { LightBox } from '../../elements/Layout';
import { IEntry } from 'client/store/storeTypes';

const CardWrapper = styled(LightBox).attrs({
  align: 'center',
  flex: '1 1 auto',
  is: 'a',
  mb: [3],
  mr: [3],
  p: 3,
  width: [4 / 12],
})`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  transform: translateZ(0);

  :hover {
    transform: scale(1.02, 1.02) translateY(-4px) translateZ(0);
    box-shadow: 0 20px 35px rgba(50, 64, 93, 0.12);
  }
`;

interface IProps {
  entry: IEntry;
}

const Card = ({ entry }: IProps) => (
  <CardWrapper href="#" title="Card">
    <Image username={entry.username} mr={3} />
    <Flex flexDirection="column" flex="1 1 auto">
      <Title small>{entry.title}</Title>
      {entry.members && (
        <CardMembersCount>{entry.members} members</CardMembersCount>
      )}
      <Flex align="center" justify="space-between" mt={2}>
        <CardRate />
        <CardJoinButton />
      </Flex>
    </Flex>
  </CardWrapper>
);

export default Card;
