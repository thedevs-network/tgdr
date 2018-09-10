import * as React from 'react';
import { NextStatelessComponent } from 'next';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';
import { getTags } from '../client/store/tags';
import { INextContextWithRedux } from 'client/store';

const Homepage: NextStatelessComponent = () => (
  <Body>
    <Cards />
    <Cards />
    <Cards />
  </Body>
);

Homepage.getInitialProps = async ({ reduxStore }: INextContextWithRedux) => {
  await reduxStore.dispatch(getTags());
  return {};
};

export default withVerifyToken(Homepage);
