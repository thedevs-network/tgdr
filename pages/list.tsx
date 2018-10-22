import * as React from 'react';
import { NextSFC } from 'next';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';
import { getTags } from '../client/store/tags';
import { getEntries, IGetEntriesParams } from '../client/store/entries';
import { INextContextWithRedux } from '../client/store';

interface IProps {
  params: IGetEntriesParams;
}

const ListPage: NextSFC<IProps> = ({ params }) => (
  <Body>
    <Cards
      category={params.category}
      sort={params.sort}
      type={params.type}
    />
  </Body>
);

ListPage.getInitialProps = async ({
  reduxStore,
  query,
}: INextContextWithRedux) => {
  await Promise.all([
    reduxStore.dispatch(getTags()),
    reduxStore.dispatch(getEntries(query)),
  ]);
  return { params: query };
};

export default withVerifyToken(ListPage);
