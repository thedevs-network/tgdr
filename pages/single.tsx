import * as React from 'react';
import { Flex } from 'grid-styled';
import { LightBox } from '../client/components/elements/Layout';
import withBody from '../client/withBody';
import { ChannelDescription, ChannelTitle } from '../client/components/elements/Typography';
import Image from '../client/components/elements/Image';
import Button from '../client/components/elements/Button';
import Icon from '../client/components/elements/Icon';
import Hr from '../client/components/elements/Hr';
import Rate from '../client/components/Rate';
import InfoList from '../client/components/InfoList';
import ReviewForm from '../client/components/ReviewForm';
import Reviews from '../client/components/Reviews';

const Single: React.SFC = () => (
  <LightBox p={4} flex="1 1 auto">
    <Flex width={[106]} mr={4} flexDirection="column">
      <Image w={[106]} h={106} />
      <InfoList />
    </Flex>
    <Flex flexDirection="column">
      <Flex align="flex-start">
        <Flex flexDirection="column" mr={4} flex="1 1 0">
          <ChannelTitle>
            The Devs
          </ChannelTitle>
          <ChannelDescription>
            The devs is community for programmers in Telegram. The devs is community for programmers in Telegram.
          </ChannelDescription>
        </Flex>
        <Flex width={[116]} align="center" flexDirection="column">
          <Button big>
            + Add
            <Icon name="telegram" size={14} fill="#ffffff" ml={2} />
          </Button>
          <Rate />
        </Flex>
      </Flex>
      <Hr my={4} />
      <ReviewForm />
      <Reviews />
    </Flex>
  </LightBox>
);

export default withBody(Single);