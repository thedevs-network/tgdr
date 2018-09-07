import * as React from 'react';
import { connect } from 'react-redux';
import SubmitModalNotice from './SubmitModalNotice';
import SubmitModalForm from './SubmitModalForm';
import { submitEntryClear } from '../../store/submitEntry';

interface IProps {
  closeModal: () => void;
  submitEntryClear: typeof submitEntryClear;
}

interface IState {
  isFormVisible: boolean;
}

class SubmitModalContainer extends React.Component<IProps, IState> {
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
    if (this.state.isFormVisible) {
      return <SubmitModalForm closeModal={this.props.closeModal} />;
    }

    return (
      <SubmitModalNotice
        closeModal={this.props.closeModal}
        showForm={this.showForm}
      />
    );
  }
}

export default connect(
  null,
  { submitEntryClear }
)(SubmitModalContainer);
