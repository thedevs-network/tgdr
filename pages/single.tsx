import * as React from 'react';
import { NextSFC } from 'next';
import { Flex } from 'grid-styled';
import { getEntry, IEntryState } from '../client/store/entry';
import withVerifyToken from '../client/withVerifyToken';
import { INextContextWithRedux } from '../client/store';
import Body from '../client/components/Body';
import { LightBox } from '../client/components/elements/Layout';
import { Description, Title } from '../client/components/elements/Typography';
import Image from '../client/components/elements/Image';
import Button from '../client/components/elements/Button';
import Icon from '../client/components/elements/Icon';
import Divider from '../client/components/elements/Divider';
import Rate from '../client/components/Rate';
import InfoList from '../client/components/InfoList';
import ReviewForm from '../client/components/ReviewForm';
import Reviews from '../client/components/Reviews';

interface IProps {
  entry: IEntryState;
}

const Single: NextSFC<IProps> = ({ entry: { data } }) => {
  const openLink = () => {
    window.open(`https://t.me/${data.username}`, '_blank');
    window.focus();
  };

  return (
    <Body>
      <LightBox p={4} flex="1 1 auto">
        <Flex width={[106]} mr={4} flexDirection="column">
          <Image w={[106]} h={106} username={data.username} />
          <InfoList entry={data} />
        </Flex>
        <Flex flexDirection="column" flex="1 1 0">
          <Flex align="flex-start">
            <Flex flexDirection="column" mr={4} flex="1 1 0">
              <Title>{data.title}</Title>
              <Description>{data.description}</Description>
            </Flex>
            <Flex width={[116]} align="center" flexDirection="column">
              <Button big onClick={openLink}>
                + Add
                <Icon name="telegram" size={14} fill="#ffffff" ml={2} />
              </Button>
              <Rate />
            </Flex>
          </Flex>
          <Divider my={4} />
          <ReviewForm />
          <Reviews />
        </Flex>
      </LightBox>
    </Body>
  );
};

Single.getInitialProps = async ({
  reduxStore,
  query: { username },
}: INextContextWithRedux) => {
  await reduxStore.dispatch(getEntry(username));
  const { entry } = reduxStore.getState();
  return { entry };
};

export default withVerifyToken(Single);
