import * as React from 'react';
import { Flex } from 'grid-styled';
import InfoListItem from './InfoListItem';

const InfoList = () => (
  <Flex mt={4} width={1} flexDirection="column">
    <InfoListItem icon="at" text="thedevs" size={15} />
    <InfoListItem icon="station" text="Channel" />
  </Flex>
);

export default InfoList;
