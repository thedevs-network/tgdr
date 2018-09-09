import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import SubmitModalForm from './SubmitModalForm';
import { ISubmitEntryState, submitNewEntry } from '../../../store/submitEntry';
import { Flex } from 'grid-styled';
import Spinner from '../../elements/Spinner';
import MessageModal from '../../MessageModal';
import { IAppState } from '../../../store';

interface IReduxStateProps {
  submitEntry: ISubmitEntryState;
}

interface IReduxDispatchProps {
  submitNewEntry: typeof submitNewEntry;
}

interface IProps extends IReduxStateProps, IReduxDispatchProps {
  closeModal: () => void;
}

class SubmitModalFormContainer extends React.Component<
  IProps & InjectedFormProps<{}, IProps>
> {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.submitNewEntry(values);
  }

  render() {
    const { closeModal, handleSubmit, submitEntry } = this.props;

    if (submitEntry.isLoading) {
      return (
        <Flex justify="center" my={4}>
          <Spinner size={32} />
        </Flex>
      );
    }

    if (submitEntry.isFetched) {
      return (
        <MessageModal
          closeModal={closeModal}
          text={submitEntry.message.text}
          title={submitEntry.message.title}
          type={submitEntry.message.type}
        />
      );
    }

    return (
      <SubmitModalForm
        onSubmit={handleSubmit(this.submit)}
        closeModal={closeModal}
      />
    );
  }
}

const validate = values => {
  const errors = {} as any;
  if (!values.username) {
    errors.username = 'Please enter a username.';
  }
  if (!values.category) {
    errors.category = 'Please enter a category.';
  }
  if (!values.title) {
    errors.title = 'Please enter a title.';
  }
  if (!values.description) {
    errors.description = 'Please enter a description.';
  }
  return errors;
};

const asyncValidate = values =>
  new Promise((resolve, reject) => {
    const errors = {} as any;
    if (values.username && values.username.length < 5) {
      errors.username = 'Username must have at least 5 chars.';
    }
    if (
      values.username &&
      values.username.length > 1 &&
      !/^[a-z]\w+$/gi.test(values.username)
    ) {
      errors.username = 'Only 0-9, a-z and underscores allowed.';
    }
    if (values.title && values.title.length < 3) {
      errors.title = 'Title must have at least 3 chars.';
    }
    if (values.title && values.title.length > 54) {
      errors.title = 'Too long. Title must have max 54 chars.';
    }
    if (values.description && values.description.length < 20) {
      errors.description = 'Description must have at least 20 chars.';
    }
    if (values.description && values.description.length > 800) {
      errors.description = 'Too long. Description must have max 800 chars.';
    }
    if (Object.keys(errors).length) {
      return reject(errors);
    }
    resolve();
  });

const SubmitForm = reduxForm<{}, IProps>({
  asyncBlurFields: ['username', 'title', 'description'],
  asyncValidate,
  form: 'submitModal',
  validate,
})(SubmitModalFormContainer);

const mapStateToProps = ({ submitEntry }: IAppState): IReduxStateProps => ({
  submitEntry,
});

export default connect<IReduxStateProps, IReduxDispatchProps>(
  mapStateToProps,
  { submitNewEntry }
)(SubmitForm);
