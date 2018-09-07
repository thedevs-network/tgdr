import * as React from 'react';
import { NextStatelessComponent } from 'next';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';

const Homepage: NextStatelessComponent = () => (
  <Body>
    <Cards />
    <Cards />
    <Cards />
  </Body>
);

export default withVerifyToken(Homepage);
