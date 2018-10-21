import * as React from 'react';
import { connect } from 'react-redux';
import { getEntries, IEntriesState } from '../../store/entries';
import Cards from './Cards';
import { IAppState } from 'client/store';

interface IReduxStateProps {
  entries: IEntriesState;
}

interface IReduxDispatchProps {
  getEntries: typeof getEntries;
}

interface IProps extends IReduxStateProps, IReduxDispatchProps {
  allowLoadMore?: boolean;
  category?: string;
  limit?: number;
  sort: 'hot' | 'top' | 'new';
  type: 'bot' | 'channel' | 'supergroup';
}

class CardsContainer extends React.Component<IProps> {
  static defaultProps = {
    allowLoadMore: false,
    limit: 9,
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
    const { entries, type, sort } = this.props;
    const data = entries.data[type][sort];
    return (
      <Cards
        data={data}
        sort={sort}
        type={type}
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
