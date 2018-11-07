import * as React from 'react';
import { connect } from 'react-redux';
import Reviews from './Reviews';
import { IAppState } from '../../store';
import { getReviews, IReviewsState } from '../../store/reviews';
import { IEntry } from '../../store/storeTypes';

interface IReduxState {
  entry: IEntry;
  isAuthenticated: boolean;
  reviews: IReviewsState;
}

interface IReduxDispatch {
  getReviews: typeof getReviews;
}

interface IProps extends IReduxState, IReduxDispatch {}

class ReviewsContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  onLoadMore(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const { entry, getReviews: getReviewsList } = this.props;
    getReviewsList(entry.username, true);
  }

  render() {
    const { isAuthenticated, reviews } = this.props;
    return (
      <Reviews
        isAuthenticated={isAuthenticated}
        reviews={reviews}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

const mapStateToProps = ({ entry, auth, reviews }: IAppState): IReduxState => ({
  entry: entry.data,
  isAuthenticated: auth.isAuthenticated,
  reviews,
});

export default connect<IReduxState, IReduxDispatch>(
  mapStateToProps,
  { getReviews }
)(ReviewsContainer);
