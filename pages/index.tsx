import * as React from 'react';
import { NextSFC } from 'next';
import Head from 'next/head';
import config from '../client.config';
import withVerifyToken from '../client/withVerifyToken';
import Body from '../client/components/Body';
import Cards from '../client/components/Cards';
import { getTags } from '../client/store/tags';
import { getEntries, IGetEntriesParams } from '../client/store/entries';
import { INextContextWithRedux } from '../client/store';
import { getPageTitle, getParamsFromQueries } from '../client/utils';

interface IProps {
  pageTitle: string;
  params: IGetEntriesParams[];
}

const Homepage: NextSFC<IProps> = ({ pageTitle, params }) => {
  const differentSorts = params.length > 1 && params[0].sort !== params[1].sort;
  const loadMore = params.length === 1;
  return (
    <>
      <Head>
        <title>Telegram Directory | {pageTitle}</title>
        <meta
          name="twitter:title"
          content={`Telegram Directory | ${pageTitle}`}
        />
        <meta name="og:title" content={`Telegram Directory | ${pageTitle}`} />
        <meta name="og:url" content="https://tgdr.io" />
        <meta
          name="twitter:image:src"
          content={`${config.CLOUDINARY_PATH}__tgdr_twitter.png`}
        />
        <meta
          name="og:image"
          content={`${config.CLOUDINARY_PATH}__tgdr_og.png`}
        />
      </Head>
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
    </>
  );
};

Homepage.getInitialProps = async ({
  reduxStore,
  query,
}: INextContextWithRedux) => {
  const params = getParamsFromQueries(query);
  const pageTitle = getPageTitle(query);
  await Promise.all([
    reduxStore.dispatch(getTags()),
    ...params.map(async item => await reduxStore.dispatch(getEntries(item))),
  ]);
  return { pageTitle, params };
};

export default withVerifyToken(Homepage);
