import * as React from 'react';
import SubmitModalNotice from './SubmitModalNotice';
import SubmitModalForm from './SubmitModalForm';

interface IProps {
  closeModal: () => void;
}

interface IState {
  isFormVisible: boolean;
}

class SubmitModal extends React.Component<IProps, IState> {
  isFormVisible: boolean;
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
    };
    this.showForm = this.showForm.bind(this);
  }

  showForm() {
    this.setState({ isFormVisible: true });
  }

  render() {
    if (this.state.isFormVisible) {
      return <SubmitModalForm closeModal={this.props.closeModal} />;
    }

    return (
      <SubmitModalNotice closeModal={this.props.closeModal} showForm={this.showForm} />
    );
  }
}

export default SubmitModal;