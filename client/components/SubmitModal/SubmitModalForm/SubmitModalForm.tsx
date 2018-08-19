import * as React from 'react';
import { Flex } from 'grid-styled';
import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import SelectInput from '../../elements/inputs/SelectInput';
import TextInput from '../../elements/inputs/TextInput';
import Textarea from '../../elements/inputs/Textarea';
import { categories } from '../../../../constants/categories';

interface ISubmitModalForm {
  closeModal: () => void;
}

const getOptions = item => ({ key: item.name, value: item.slug });

const SubmitModalForm: React.SFC<ISubmitModalForm> = ({ closeModal }) => {
  const categoryOptions = [
    { key: 'Select a category', value: '' },
    ...categories.map(getOptions),
  ];
  return (
    <>
      <Flex justifyContent="space-between" >
        <TextInput label="Username" name="username" placeholder="@example" mr={3} mb={3} />
        <SelectInput label="Category" name="category" mb={3} options={categoryOptions} />
      </Flex>
      <Flex width={1}>
        <TextInput label="Name" name="name" placeholder="Lorem Ipsum" mb={3} />
      </Flex>
      <Flex mb={4}>
        <Textarea
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
    </>
  );
};

export default SubmitModalForm;