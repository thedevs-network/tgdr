import * as React from 'react';
import { NextSFC } from 'next';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';
import { getTags } from '../client/store/tags';
import { getEntries, IGetEntriesParams } from '../client/store/entries';
import { INextContextWithRedux } from '../client/store';
import { getParamsFromQueries } from '../client/utils';

interface IProps {
  params: IGetEntriesParams[];
}

const Homepage: NextSFC<IProps> = ({ params }) => {
  const differentSorts = params.length > 1 && params[0].sort !== params[1].sort;
  const loadMore = params.length === 1;
  return (
    <Body>
      {params.map((item, index) => (
        <Cards
          category={item.category}
          key={index}
          sort={item.sort}
          type={item.type}
          differentSorts={differentSorts}
          loadMore={loadMore}
        />
      ))}
    </Body>
  );
};

Homepage.getInitialProps = async ({
  reduxStore,
  query,
}: INextContextWithRedux) => {
  const params = getParamsFromQueries(query);
  await Promise.all([
    reduxStore.dispatch(getTags()),
    ...params.map(async item => await reduxStore.dispatch(getEntries(item))),
  ]);
  return { params };
};

export default withVerifyToken(Homepage);
