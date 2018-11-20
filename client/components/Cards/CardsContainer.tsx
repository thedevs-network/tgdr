import * as React from 'react';
import { connect } from 'react-redux';
import {
  getEntries,
  IEntriesState,
  IGetEntriesParams,
} from '../../store/entries';
import Cards from './Cards';
import { IAppState } from '../../store';

interface IReduxStateProps {
  entries: IEntriesState;
}

interface IReduxDispatchProps {
  getEntries: typeof getEntries;
}

interface IProps
  extends IReduxStateProps,
    IReduxDispatchProps,
    IGetEntriesParams {
  allowLoadMore?: boolean;
  differentSorts?: boolean;
  loadMore?: boolean;
}

class CardsContainer extends React.Component<IProps> {
  static defaultProps = {
    allowLoadMore: false,
    differentSorts: false,
    limit: 9,
    loadMore: false,
  };

  constructor(props) {
    super(props);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  onLoadMore(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const { category, sort, type, getEntries: getEntriesList } = this.props;
    getEntriesList({ category, sort, type, loadMore: true });
  }

  render() {
    const {
      differentSorts,
      entries,
      category,
      loadMore,
      type,
      sort,
    } = this.props;
    const data = entries.data[type][sort];
    const total = entries.total;
    return (
      <Cards
        data={data}
        category={category}
        sort={sort}
        total={total}
        type={type}
        differentSorts={differentSorts}
        loadMore={loadMore}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

const mapStateToProps = ({ entries }: IAppState): IReduxStateProps => ({
  entries,
});

export default connect<IReduxStateProps, IReduxDispatchProps>(
  mapStateToProps,
  { getEntries }
)(CardsContainer);
