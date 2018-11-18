import * as React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { Flex } from 'grid-styled';
import CardJoinButton from './CardJoinButton';
import CardMembersCount from './CardMembersCount';
import CardRate from './CardRate';
import { Title } from '../../elements/Typography';
import Image from '../../elements/Image';
import { LightBox } from '../../elements/Layout';
import { IEntry } from 'client/store/storeTypes';
import Icon from '../../elements/Icon';

const CardWrapper = styled(LightBox).attrs({
  align: 'center',
  flex: '1 1 auto',
  is: 'a',
  mb: [3],
  mr: [0, 0, 3],
  p: 3,
  width: [1, 1, 4 / 12],
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

const InfoWrapper = styled(Flex).attrs({
  flex: '1 1 auto',
  flexDirection: 'column',
})`
  padding: 1px 0;
  overflow: hidden;
`;

interface IProps {
  entry: IEntry;
}

const Card = ({ entry }: IProps) => {
  const goToEntry = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push(`/single?username=@${entry.username}`, `/@${entry.username}`);
  };

  return (
    <CardWrapper
      title={entry.username}
      onClick={goToEntry}
      href={`/@${entry.username}`}
    >
      <Image nophoto={entry.nophoto} username={entry.username} mr={3} />
      <InfoWrapper>
        <Title small>{entry.title}</Title>
        {entry.members && (
          <CardMembersCount>{entry.members} members</CardMembersCount>
        )}
        <Flex align="center" justify="space-between" mt={2}>
          <CardRate ratio={entry.ratio} />
          <Flex align="center">
            {entry.featured && (
              <Icon name="star" mr={2} size={17} fill="#F9A825" />
            )}
            {entry.verified && (
              <Icon name="star" mr={2} size={17} fill="#63B3F3" />
            )}
            <CardJoinButton username={entry.username} />
          </Flex>
        </Flex>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default Card;
