import * as React from 'react';
import { Flex } from 'grid-styled';
import InfoListItem from './InfoListItem';
import { IEntry } from '../../store/storeTypes';
import { categories, types } from '../../../constants/categories';

interface IProps {
  entry: IEntry;
}

const InfoList: React.SFC<IProps> = ({ entry }) => {
  const { featured, members, verified, username } = entry;
  const type = types.find(item => item.slug === entry.type);
  const category = categories.find(item => item.slug === entry.category);
  return (
    <Flex mt={4} width={1} flexDirection="column">
      {verified && (
        <InfoListItem icon="star" text="Verified" color="#63B3F3" size={15} />
      )}
      {featured && (
        <InfoListItem icon="star" text="Featured" color="#F9A825" size={15} />
      )}
      <InfoListItem icon="at" text={username} size={15} />
      <InfoListItem icon={type.icon} text={type.name.replace('s', '')} />
      {category && <InfoListItem icon="tag" text={category.name} />}
      {members && <InfoListItem icon="users" text={members} />}
    </Flex>
  );
};

export default InfoList;
