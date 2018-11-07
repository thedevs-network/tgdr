import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import ReviewForm from './ReviewForm';
import ReviewFormPlaceholder from './ReviewFormPlaceholder';
import { IAppState } from '../../store';
import { IEntry } from '../../store/storeTypes';
import { getReviews, submitReview } from '../../store/reviews';
import { hasAd } from '../../utils';

interface IReduxState {
  entry: IEntry;
}

interface IReduxDispatch {
  getReviews: typeof getReviews;
  submitReview: typeof submitReview;
}

interface IProps extends IReduxState, IReduxDispatch {}

class ReviewFormContainer extends React.Component<
  IProps & InjectedFormProps<{}, IProps>
> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const {
      entry,
      getReviews: getLatestReviews,
      reset,
      submitReview: submit,
    } = this.props;
    reset();
    await submit({
      disliked: entry.review.disliked,
      liked: entry.review.liked,
      text: values.text,
      username: entry.username,
    });
    await getLatestReviews(entry.username);
  }

  render() {
    const {
      entry: { review },
      handleSubmit,
      submitting,
    } = this.props;
    const hasFeedback = review.liked || review.disliked;

    if (!hasFeedback) {
      return <ReviewFormPlaceholder />;
    }

    return (
      <ReviewForm
        onSubmit={handleSubmit(this.onSubmit)}
        submitting={submitting}
      />
    );
  }
}

const validate = values => {
  const errors: Record<string, string> = {};
  if (
    !values.text ||
    (values.text && (values.text.length < 20 || values.text.length > 400))
  ) {
    errors.text = 'You must enter a review between 20 and 400 chars.';
  }

  if (values.text && hasAd(values.text)) {
    errors.text =
      'Review must not contain any links or ads. Violators will be banned.';
  }
  return errors;
};

const ReviewReduxForm = reduxForm<{}, IProps>({
  form: 'review',
  validate,
})(ReviewFormContainer);

const mapStateToProps = ({ entry }: IAppState): IReduxState => ({
  entry: entry.data,
});

export default connect<IReduxState, IReduxDispatch>(
  mapStateToProps,
  { getReviews, submitReview }
)(ReviewReduxForm);
