import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { LightBox } from '../../elements/Layout';

interface IProps {
  children: (Function) => JSX.Element;
  trigger: JSX.Element;
  width?: number[];
}

interface IState {
  show?: boolean;
}

const ModalContainer = styled(Flex).attrs({
  align: 'center',
  flexDirection: 'column',
  justify: 'flex-start',
  py: 5,
}) <Partial<IState>>`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 6, 10, 0.8);
  background: linear-gradient(to bottom, rgba(0, 6, 10, 0.8), rgba(84, 88, 91, 0.8));
  z-index: 9999;
  overflow: auto;
`;

class Modal extends React.Component<IProps, IState> {
  public static defaultProps = {
    width: [0.84, 0.8, 600]
  };

  public show: boolean;
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  public openModal() {
    this.setState({ show: true });
    document.body.style.overflow = 'hidden';
  }

  public closeModal(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ show: false });
    document.body.style.overflow = 'auto';
  }

  public handleOutsideClick(e) {
    if (e.target.id === 'modal') {
      this.closeModal();
    }
  }

  public render() {
    return (
      <>
        {React.cloneElement(this.props.trigger, {
          onClick: this.openModal,
        })}
        {this.state.show && (
          <ModalContainer id="modal" onClick={this.handleOutsideClick}>
            <LightBox
              px={[16, 32]}
              py={[32, 48]}
              width={this.props.width}
              flexDirection="column"
              flex="0 0 auto"
            >
              {this.props.children(this.closeModal)}
            </LightBox>
          </ModalContainer>
        )}
      </>
    );
  }
}

export default Modal;