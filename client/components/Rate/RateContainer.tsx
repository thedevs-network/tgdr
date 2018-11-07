import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store';
import Rate from './Rate';
import { getReviews, submitReview } from '../../store/reviews';
import { IEntry } from '../../store/storeTypes';

interface IReduxStateProps {
  isAuthenticated: boolean;
  entry: IEntry;
}

interface IReduxDispatchProps {
  getReviews: typeof getReviews;
  submitReview: typeof submitReview;
}

interface IProps extends IReduxStateProps, IReduxDispatchProps {}

class RateContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.onRate = this.onRate.bind(this);
  }

  onRate(type: 'liked' | 'disliked') {
    return async (e: React.MouseEvent<HTMLElement>) => {
      (e.target as any).blur();
      const {
        entry: { review = {}, username },
        submitReview: submit,
        getReviews: getReviewsList,
      } = this.props;
      let newLiked;
      let newDisliked;
      if (type === 'liked') {
        newLiked = !review.liked;
        newDisliked = false;
      }
      if (type === 'disliked') {
        newDisliked = !review.disliked;
        newLiked = false;
      }
      await submit({ liked: newLiked, disliked: newDisliked, username });
      await getReviewsList(username);
    };
  }

  render() {
    const { entry, isAuthenticated } = this.props;
    const liked = !!entry.review && entry.review.liked;
    const disliked = !!entry.review && entry.review.disliked;
    return (
      <Rate
        isAuthenticated={isAuthenticated}
        liked={liked}
        likes={entry.likes}
        disliked={disliked}
        dislikes={entry.dislikes}
        onRate={this.onRate}
      />
    );
  }
}

const mapStateToProps = ({ auth, entry }: IAppState): IReduxStateProps => ({
  entry: entry.data,
  isAuthenticated: auth.isAuthenticated,
});

export default connect<IReduxStateProps, IReduxDispatchProps>(
  mapStateToProps,
  { getReviews, submitReview }
)(RateContainer);
