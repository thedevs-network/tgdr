import * as React from 'react';
import { connect } from 'react-redux';
import SubmitModalNotice from './SubmitModalNotice';
import SubmitModalForm from './SubmitModalForm';
import { submitEntryClear } from '../../store/submitEntry';

interface IReduxDispatchProps {
  submitEntryClear: typeof submitEntryClear;
}

interface IProps extends IReduxDispatchProps {
  closeModal: () => void;
  isEdit?: boolean;
}

interface IState {
  isFormVisible: boolean;
}

class SubmitModalContainer extends React.Component<IProps, IState> {
  static defaultProps = {
    isEdit: false,
  };

  isFormVisible: boolean;
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
    };
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    this.props.submitEntryClear();
  }

  showForm() {
    this.setState({ isFormVisible: true });
  }

  render() {
    const { isEdit } = this.props;

    if (this.state.isFormVisible) {
      return (
        <SubmitModalForm closeModal={this.props.closeModal} isEdit={isEdit} />
      );
    }

    return (
      <SubmitModalNotice
        closeModal={this.props.closeModal}
        showForm={this.showForm}
      />
    );
  }
}

export default connect<{}, IReduxDispatchProps>(
  null,
  { submitEntryClear }
)(SubmitModalContainer);
