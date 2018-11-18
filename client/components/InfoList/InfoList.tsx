import * as React from 'react';
import { Flex } from 'grid-styled';
import InfoListItem from './InfoListItem';
import { IEntry } from '../../store/storeTypes';
import { categories, types } from '../../../constants/categories';
import LoginModal from '../LoginModal';
import ReportModal from '../ReportModal';
import SubmitModal from '../SubmitModal';
import Modal from '../elements/Modal';
import { Link } from '../elements/Typography';
import { IAuthState } from '../../store/auth';

interface IProps {
  auth: IAuthState;
  entry: IEntry;
}

const InfoList: React.SFC<IProps> = ({ entry, auth }) => {
  const { featured, members, verified, username } = entry;
  const type = types.find(item => item.slug === entry.type);
  const category = categories.find(item => item.slug === entry.category);

  const report = auth.isAuthenticated
    ? closeModal => <ReportModal closeModal={closeModal} />
    : closeModal => <LoginModal closeModal={closeModal} />;

  return (
    <Flex
      mb={3}
      mt={4}
      width={1}
      justify={['center', 'flex-start']}
      flexDirection={['row', 'column']}
      flexWrap={['wrap', 'nowrap']}
    >
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
      <Flex ml={[1, 0]}>
        <Modal
          trigger={
            <Link href="#" title="Report" secondary small>
              Report
            </Link>
          }
        >
          {report}
        </Modal>
      </Flex>
      <Flex ml={[2, 0]}>
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
    </Flex>
  );
};

export default InfoList;
