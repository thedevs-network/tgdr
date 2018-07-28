import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../elements/Icon';
import Button from '../elements/Button';
import Divider from '../elements/Divider';

const IconBox = styled(Flex).attrs({
  align: 'center',
  alignSelf: 'center',
  justify: 'center',
})`
  width: 80px;
  height: 80px;
  border: 4px solid ${props => props.color};
  border-radius: 100%;
`;

const Title = styled.h2`
  margin: 0 0 4px;
  padding: 0;
  font-size: 26px;
  font-weight: 500;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 19px;
`;

interface IMessageModal {
  closeModal?: () => void;
  text: string;
  title: string;
  type?: 'success' | 'error';
}

const MessageModal: React.SFC<IMessageModal> = ({ closeModal, text, title, type }) => {
  const iconName = type === 'success' ? 'check' : 'close';
  const color: string = type === 'success' ? '#81C784' : '#E57373';

  return (
    <>
      <Flex align="center">
        <Flex flex="0 0 0" width={[100]} mx={4}>
          <IconBox color={color}>
            <Icon name={iconName} fill={color} size={54} />
          </IconBox>
        </Flex>
        <Flex flexDirection="column">
          <Title>
            {title}
          </Title>
          <Text>
            {text}
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Button onClick={closeModal} modalSecondary>
        Ok
      </Button>
    </>
  );
};

MessageModal.defaultProps = {
  closeModal: () => undefined,
  type: 'error',
};

export default MessageModal;