import * as React from 'react';
import { Field } from 'redux-form';
import { Flex } from 'grid-styled';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import SelectInput from '../elements/inputs/SelectInput';
import Textarea from '../elements/inputs/Textarea';

interface IProps {
  reasonOptions: string[];
  withInfo?: boolean;
  closeModal(): void;
  onSubmit(): void;
}

const ReportEntryModal: React.SFC<IProps> = ({
  reasonOptions,
  withInfo,
  closeModal,
  onSubmit,
}) => (
  <Flex flexDirection="column" is="form" onSubmit={onSubmit}>
    <Flex flexDirection="column">
      <Field
        options={[
          { key: 'Select a reason', value: '' },
          ...reasonOptions.map(item => ({ key: item, value: item })),
        ]}
        mb={3}
        name="reason"
        component={SelectInput}
        label="Reason"
        required
      />
      {withInfo && (
        <Field
          component={Textarea}
          label="More info (optional)"
          mb={3}
          name="info"
          placeholder="The bot is not responding anymore."
        />
      )}
    </Flex>
    <Button modal>
      <Icon name="telegram" fill="#f5f5f5" size={14} mr={[2, 3]} />
      Submit report
    </Button>
    <Flex mt={3} flexDirection="column">
      <Button onClick={closeModal} modalSecondary>
        Cancel
      </Button>
    </Flex>
  </Flex>
);

ReportEntryModal.defaultProps = {
  withInfo: true,
};

export default ReportEntryModal;
