import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Icon from '../../elements/Icon';
import { submissionInfo } from '../../../../constants/texts';
import Divider from '../../elements/Divider';
import Button from '../../elements/Button';

interface ISubmitModalNotice {
  closeModal: () => void;
  showForm: () => void;
}

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
`;

const Ul = styled(Flex).attrs({
  flexDirection: 'column',
  is: 'ul',
  m: 0,
  p: 0,
})`
  list-style: none;
  text-decoration: none;
`;

const Li = styled(Flex).attrs({
  align: 'center',
  is: 'li',
  m: 0,
  p: 0,
})`
  margin-bottom: 24px;
  list-style: none;
  text-decoration: none;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;

const SubmitModalNotice: React.SFC<ISubmitModalNotice> = ({
  closeModal,
  showForm,
}) => (
  <>
    <Title>Before you submit:</Title>
    <Divider my={3} />
    <Ul>
      {submissionInfo.map((text, index) => (
        <Li key={`submission_info_${index}`}>
          <Icon name="info" mr={3} size={18} fill="#888" />
          <Text>{text}</Text>
        </Li>
      ))}
    </Ul>
    <Divider my={3} />
    <Button onClick={showForm} modal>
      Ok, let's go!
      <Icon name="arrowRight" fill="#f5f5f5" size={14} ml={3} />
    </Button>
    <Flex mt={3} flexDirection="column">
      <Button onClick={closeModal} modalSecondary>
        Cancel
      </Button>
    </Flex>
  </>
);

export default SubmitModalNotice;
