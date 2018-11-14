import * as React from 'react';
import styled, { keyframes } from 'styled-components';
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
})<Partial<IState>>`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 6, 10, 0.8);
  background: linear-gradient(
    to bottom,
    rgba(0, 6, 10, 0.8),
    rgba(84, 88, 91, 0.8)
  );
  z-index: 9999;
  overflow: auto;
`;

const anime = keyframes`
  from {
    transform: translateY(-40%) scale(0.5, 0.5);
  }

  to {
    transform: translateY(0) scale(1, 1);
  }
`;

const ModalBox = styled(LightBox)`
  animation: ${anime} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

class Modal extends React.Component<IProps, IState> {
  static defaultProps = {
    width: [0.84, 0.8, 600],
  };

  show: boolean;
  constructor(props) {
    super(props);

    this.state = {
      show: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ show: true });
    document.body.style.overflow = 'hidden';
  }

  closeModal(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    this.setState({ show: false });
    document.body.style.overflow = 'auto';
  }

  handleOutsideClick(e) {
    if (e.target.id === 'modal') {
      this.closeModal();
    }
  }

  render() {
    const { show } = this.state;
    const { children, trigger, width } = this.props;

    return (
      <>
        {trigger && React.cloneElement(trigger, {
          onClick: this.openModal,
        })}
        {show && (
          <ModalContainer id="modal" onClick={this.handleOutsideClick}>
            <ModalBox
              px={[16, 32]}
              py={[32, 48]}
              width={width}
              flexDirection="column"
              flex="0 0 auto"
            >
              {children(this.closeModal)}
            </ModalBox>
          </ModalContainer>
        )}
      </>
    );
  }
}

export default Modal;
