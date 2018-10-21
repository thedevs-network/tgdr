import * as React from 'react';
import { NextStatelessComponent } from 'next';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';
import { getTags } from '../client/store/tags';
import { getEntries } from '../client/store/entries';
import { INextContextWithRedux } from 'client/store';

const Homepage: NextStatelessComponent = () => (
  <Body>
    <Cards sort="top" type="channel" />
    <Cards sort="top" type="bot" />
    <Cards sort="top" type="supergroup" />
  </Body>
);

Homepage.getInitialProps = async ({ reduxStore }: INextContextWithRedux) => {
  await Promise.all([
    await reduxStore.dispatch(getTags()),
    await reduxStore.dispatch(getEntries({
      limit: 9,
      sort: 'top',
      type: 'channel',
    })),
    await reduxStore.dispatch(getEntries({
      limit: 9,
      sort: 'top',
      type: 'bot',
    })),
    await reduxStore.dispatch(getEntries({
      limit: 9,
      sort: 'top',
      type: 'supergroup',
    })),
  ])
  return {};
};

export default withVerifyToken(Homepage);
