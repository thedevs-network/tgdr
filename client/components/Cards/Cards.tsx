import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import media from 'styled-media-query';
import Card from './Card';
import CardsHeader from './CardsHeader';
import { IEntry } from '../../store/storeTypes';
import { IGetEntriesParams } from '../../store/entries';
import { Link } from '../elements/Typography';

const CardsWrapper = styled(Flex).attrs({
  flexDirection: ['column', 'row'],
})`
  > * {
    max-width: calc(33.33333333% - 11px);
  }

  > *:nth-child(3n) {
    margin-right: 0;
  }

  ${media.lessThan('medium')`
    > * {
      max-width: 100%;
      margin-right: 0;
    }
  `};
`;

const Text = styled.p`
  margin: -8px 0 16px;
  padding: 0;
  font-size: 15px;
  color: #aaa;
`;

interface IProps extends IGetEntriesParams {
  data: IEntry[];
  differentSorts?: boolean;
  loadMore?: boolean;
  total: number;
  onLoadMore(e: React.MouseEvent<HTMLAnchorElement>): void;
}

const Cards: React.SFC<IProps> = ({
  data,
  differentSorts,
  category,
  loadMore,
  sort,
  total,
  type,
  onLoadMore,
}) => (
  <Flex flexDirection="column" is="section">
    <CardsHeader
      category={category}
      sort={sort}
      type={type}
      useSortIcons={differentSorts}
      showViewAllLink={!loadMore}
    />
    <CardsWrapper flexWrap="wrap">
      {data.length ? (
        data.map(entry => <Card key={entry.username} entry={entry} />)
      ) : (
        <Text>Nothing to show yet.</Text>
      )}
    </CardsWrapper>
    {total > data.length &&
      loadMore && (
        <Flex justify="flex-end" mt={3}>
          <Link href="#" title="Load more entries" onClick={onLoadMore} big>
            + Load More
          </Link>
        </Flex>
      )}
  </Flex>
);

Cards.defaultProps = {
  differentSorts: false,
  loadMore: false,
};

export default Cards;
