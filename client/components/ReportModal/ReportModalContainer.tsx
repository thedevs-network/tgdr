import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import ReportEntryModal from './ReportModal';
import { Flex } from 'grid-styled';
import Spinner from '../elements/Spinner';
import MessageModal from '../MessageModal';
import {
  reportMessages,
  reportOptions,
  reportReviewOptions,
} from '../../../constants/texts';
import { reportEntry } from '../../store/entry';

interface IReduxDispatch {
  reportEntry: typeof reportEntry;
}

interface IProps extends IReduxDispatch {
  reviewId?: string;
  withInfo?: boolean;
  withReviewOptions?: boolean;
  closeModal(): void;
}

interface IState {
  isFetched: boolean;
  isLoading: boolean;
  messageType: 'error' | 'success';
}

class ReportModalContainer extends React.Component<
  IProps & InjectedFormProps<{}, IProps>,
  IState
> {
  static defaultProps = {
    reviewId: null,
    withInfo: true,
    withReviewOptions: false,
  };

  state: IState;
  constructor(props) {
    super(props);

    this.state = {
      isFetched: false,
      isLoading: false,
      messageType: 'success',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const { reviewId } = this.props;
    this.setState({ isLoading: true });
    try {
      await this.props.reportEntry({ ...values, reviewId });
      this.setState({ messageType: 'success' });
    } catch (error) {
      this.setState({ messageType: 'error' });
    }
    this.setState({
      isFetched: true,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, isFetched, messageType } = this.state;
    const {
      closeModal,
      handleSubmit,
      withInfo,
      withReviewOptions,
    } = this.props;

    if (isFetched) {
      const message = reportMessages[messageType];
      return (
        <MessageModal
          closeModal={closeModal}
          text={message.text}
          title={message.title}
          type={message.type}
        />
      );
    }

    if (isLoading) {
      return (
        <Flex justify="center" my={4}>
          <Spinner size={32} />
        </Flex>
      );
    }

    const reasonOptions = withReviewOptions
      ? reportReviewOptions
      : reportOptions;

    return (
      <ReportEntryModal
        closeModal={closeModal}
        onSubmit={handleSubmit(this.onSubmit)}
        withInfo={withInfo}
        reasonOptions={reasonOptions}
      />
    );
  }
}

const validate = values => {
  const errors: Record<string, string> = {};
  if (!values.reason) {
    errors.reason = 'Please select a reason.';
  }
  if (values.info && values.info.length > 400) {
    errors.info = 'Information is too long.';
  }
  return errors;
};

const ReportEntryModalForm = reduxForm<{}, IProps>({
  form: 'report-entry',
  validate,
})(ReportModalContainer);

export default connect<{}, IReduxDispatch>(
  null,
  { reportEntry }
)(ReportEntryModalForm);
