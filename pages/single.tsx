import styled from 'styled-components';
import { NextSFC } from 'next';
import Head from 'next/head';
import { Box, Flex } from 'grid-styled';
import Error from './_error';
import { Description, Title } from '../client/components/elements/Typography';
import Icon from '../client/components/elements/Icon';
import { getEntry } from '../client/store/entry';
import withVerifyToken from '../client/withVerifyToken';
import { IAppState, INextContextWithRedux } from '../client/store';
import Body from '../client/components/Body';
import { LightBox } from '../client/components/elements/Layout';
import * as React from 'react';
import Image from '../client/components/elements/Image';
import Button from '../client/components/elements/Button';
import { connect } from 'react-redux';
import Divider from '../client/components/elements/Divider';
import Rate from '../client/components/Rate';
import InfoList from '../client/components/InfoList';
import ReviewForm from '../client/components/ReviewForm';
import Reviews from '../client/components/Reviews';
import { getReviews } from '../client/store/reviews';
import { getTags } from '../client/store/tags';
import { getOpenLink } from '../client/utils';
import { IEntry } from '../client/store/storeTypes';
import { IAuthState } from '../client/store/auth';

const TitleWrapper = styled(Flex).attrs({
  flex: '1 1 0',
  flexDirection: 'column',
  mr: [2, 4],
})`
  min-width: 0;
`;

interface IReduxProps {
  auth: IAuthState;
  entry: IEntry;
}

const Single: NextSFC<IReduxProps> = ({ entry, auth }: IReduxProps) => {
  if (!entry) return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>
          Telegram Directory | {entry.title} (@
          {entry.username})
        </title>
      </Head>
      <Body>
        <LightBox p={[3, 4]} flex="1 1 auto" flexDirection={['column', 'row']}>
          <Flex
            mr={[0, 4]}
            width={[1, 106]}
            align={['center', 'flex-start']}
            flexDirection="column"
          >
            <Image
              w={[106]}
              h={106}
              nophoto={entry.nophoto}
              username={entry.username}
            />
            <InfoList entry={entry} auth={auth} />
          </Flex>
          <Box mt={[3, 0]} flex="1 1 auto">
            <Flex align="flex-start">
              <TitleWrapper>
                <Title>{entry.title}</Title>
                <Description>{entry.description}</Description>
              </TitleWrapper>
              <Flex width={[102, 116]} align="center" flexDirection="column">
                <Button big responsive onClick={getOpenLink(entry.username)}>
                  + Add
                  <Icon name="telegram" size={14} fill="#ffffff" ml={2} />
                </Button>
                <Rate />
              </Flex>
            </Flex>
            <Divider my={4} />
            <ReviewForm />
            <Reviews />
          </Box>
        </LightBox>
      </Body>
    </>
  );
};

Single.getInitialProps = async ({
  reduxStore,
  res,
  query: { username },
}: INextContextWithRedux) => {
  await Promise.all([
    reduxStore.dispatch(getTags()),
    reduxStore.dispatch(getEntry(username)),
    reduxStore.dispatch(getReviews(username)),
  ]);
  const { auth, entry } = reduxStore.getState();
  if (!entry.data) res.statusCode = 404;
  return { entry: entry.data, auth };
};

const mapStateToProps = ({ auth, entry }: IAppState): IReduxProps => ({
  auth,
  entry: entry.data,
});

export default connect<IReduxProps>(mapStateToProps)(withVerifyToken(Single));
