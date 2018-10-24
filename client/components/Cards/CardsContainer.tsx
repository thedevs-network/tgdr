import * as React from 'react';
import { connect } from 'react-redux';
import {
  getEntries,
  IEntriesState,
  IGetEntriesParams,
} from '../../store/entries';
import Cards from './Cards';
import { IAppState } from 'client/store';

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

  componentDidMount() {
    const { category, limit, sort, type } = this.props;
    this.props.getEntries({
      category,
      limit,
      sort,
      type,
    });
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
    return (
      <Cards
        data={data}
        category={category}
        sort={sort}
        type={type}
        differentSorts={differentSorts}
        loadMore={loadMore}
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
