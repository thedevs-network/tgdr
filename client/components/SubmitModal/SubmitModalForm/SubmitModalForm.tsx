import * as React from 'react';
import { Flex } from 'grid-styled';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import SelectInput from '../../elements/inputs/SelectInput';
import TextInput from '../../elements/inputs/TextInput';
import Textarea from '../../elements/inputs/Textarea';
import { categories } from '../../../../constants/categories';

interface ISubmitModalForm {
  onSubmit: any;
  closeModal: () => void;
}

const getOptions = item => ({ key: item.name, value: item.slug });

const replaceUnaccepted = (value: string) => value && value.replace(/\W/gi, '');

const SubmitModalForm: React.SFC<ISubmitModalForm> = ({
  closeModal,
  onSubmit,
}) => {
  const categoryOptions = [
    { key: 'Select a category', value: '' },
    ...categories.map(getOptions),
  ];
  return (
    <Flex is="form" onSubmit={onSubmit} flexDirection="column">
      <Flex justify="space-between">
        <Field
          component={TextInput}
          label="Username"
          mb={3}
          mr={3}
          name="username"
          placeholder="example"
          prepend="@"
          normalize={replaceUnaccepted}
        />
        <Field
          options={categoryOptions}
          mb={3}
          name="category"
          component={SelectInput}
          label="Category"
        />
      </Flex>
      <Flex width={1}>
        <Field
          component={TextInput}
          label="Title"
          mb={3}
          name="title"
          placeholder="Example"
        />
      </Flex>
      <Flex mb={4}>
        <Field
          component={Textarea}
          label="Description"
          name="description"
          placeholder="A helpful and informative description"
        />
      </Flex>
      <Button modal>
        <Icon name="telegram" fill="#f5f5f5" size={14} mr={3} />
        Submit
      </Button>
      <Flex mt={3} flexDirection="column">
        <Button onClick={closeModal} modalSecondary>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default SubmitModalForm;
