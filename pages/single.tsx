import * as React from 'react';
import { NextSFC } from 'next';
import { Flex } from 'grid-styled';
import { getEntry } from '../client/store/entry';
import withVerifyToken from '../client/withVerifyToken';
import { INextContextWithRedux } from '../client/store';
import Body from '../client/components/Body';
import { LightBox } from '../client/components/elements/Layout';
import {
  Description,
  Link,
  Title,
} from '../client/components/elements/Typography';
import Image from '../client/components/elements/Image';
import Button from '../client/components/elements/Button';
import Icon from '../client/components/elements/Icon';
import Divider from '../client/components/elements/Divider';
import Rate from '../client/components/Rate';
import InfoList from '../client/components/InfoList';
import ReviewForm from '../client/components/ReviewForm';
import Reviews from '../client/components/Reviews';
import { getReviews } from '../client/store/reviews';
import { getOpenLink } from '../client/utils';
import Modal from '../client/components/elements/Modal';
import SubmitModal from '../client/components/SubmitModal';
import { IEntry } from '../client/store/storeTypes';
import ReportModal from '../client/components/ReportModal';
import { IAuthState } from '../client/store/auth';
import LoginModal from '../client/components/LoginModal';

interface IProps {
  auth: IAuthState;
  entry: IEntry;
}

const Single: NextSFC<IProps> = ({ entry, auth }) => {
  const report = auth.isAuthenticated
    ? closeModal => <ReportModal closeModal={closeModal} />
    : closeModal => <LoginModal closeModal={closeModal} />;

  return (
    <Body>
      <LightBox p={4} flex="1 1 auto">
        <Flex width={[106]} mr={4} flexDirection="column">
          <Image
            w={[106]}
            h={106}
            nophoto={entry.nophoto}
            username={entry.username}
          />
          <InfoList entry={entry} />
          <Modal
            trigger={
              <Link href="#" title="Report" secondary small>
                Report
              </Link>
            }
          >
            {report}
          </Modal>
          {auth.isAdmin && (
            <Modal
              trigger={
                <Link href="#" title="Edit" secondary small>
                  Edit
                </Link>
              }
            >
              {closeModal => <SubmitModal closeModal={closeModal} isEdit />}
            </Modal>
          )}
        </Flex>
        <Flex flexDirection="column" flex="1 1 0">
          <Flex align="flex-start">
            <Flex flexDirection="column" mr={4} flex="1 1 0">
              <Title>{entry.title}</Title>
              <Description>{entry.description}</Description>
            </Flex>
            <Flex width={[116]} align="center" flexDirection="column">
              <Button big onClick={getOpenLink(entry.username)}>
                + Add
                <Icon name="telegram" size={14} fill="#ffffff" ml={2} />
              </Button>
              <Rate />
            </Flex>
          </Flex>
          <Divider my={4} />
          <ReviewForm />
          <Reviews />
        </Flex>
      </LightBox>
    </Body>
  );
};

Single.getInitialProps = async ({
  reduxStore,
  query: { username },
}: INextContextWithRedux) => {
  await Promise.all([
    reduxStore.dispatch(getEntry(username)),
    reduxStore.dispatch(getReviews(username)),
  ]);
  const { auth, entry } = reduxStore.getState();
  return { entry: entry.data, auth };
};

export default withVerifyToken(Single);
