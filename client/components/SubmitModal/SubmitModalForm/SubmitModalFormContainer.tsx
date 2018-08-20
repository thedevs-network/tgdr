import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import SubmitModalForm from './SubmitModalForm';

interface IProps {
  closeModal: () => void;
}

class SubmitModalFormContainer extends React.Component<IProps & InjectedFormProps<{}, IProps>> {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    alert(JSON.stringify(values));
  }

  render() {
    const { closeModal, handleSubmit } = this.props;
    return (
      <SubmitModalForm
        onSubmit={handleSubmit(this.submit)}
        closeModal={closeModal}
      />
    );
  }
}

const mapStateToProps = ({ }) => ({});

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

const asyncValidate = values => new Promise((resolve, reject) => {
  const errors = {} as any;
  if (values.username && values.username.replace('@', '').length < 5) {
    errors.username = 'Username must have at least 5 chars.';
  }
  if (values.username && values.username.length > 1 && !/^@?[a-z]\w+$/gi.test(values.username)) {
    errors.username = 'Only 0-9, a-z and underscores allowed.';
  }
  if (values.title && values.title.length < 3) {
    errors.title = 'Title must have at least 3 chars.';
  }
  if (values.description && values.description.length < 20) {
    errors.description = 'Description must have at least 20 chars.';
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

export default connect(mapStateToProps, null)(SubmitForm);
