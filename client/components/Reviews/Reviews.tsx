import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import format from 'date-fns/format';
import media from 'styled-media-query';
import ReportModal from '../ReportModal';
import LoginModal from '../LoginModal';
import Icon from '../elements/Icon';
import Divider from '../elements/Divider';
import { IReviewsState } from '../../store/reviews';
import { Link } from '../elements/Typography';
import Modal from '../elements/Modal';

const Count = styled.h5`
  margin: 0 0 8px;
  padding: 0;
  font-size: 14;
  font-weight: 500;
`;

const Name = styled.h4`
  margin: 0 0 8px;
  padding: 0;
  font-size: 14px;
  font-weight: 500;

  ${media.lessThan('470px')`
    margin: 0;
    font-size: 13px;
  `};
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #c7cfd6;

  ${media.lessThan('470px')`
    margin: 0;
    font-size: 11px;
  `};
`;

const Body = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #808080;

  ${media.lessThan('470px')`
    margin: 0;
    font-size: 13px;
  `};
`;

interface IProps {
  reviews: IReviewsState;
  isAuthenticated: boolean;
  onLoadMore(e: React.MouseEvent<HTMLAnchorElement>): void;
}

const Reviews: React.SFC<IProps> = ({
  isAuthenticated,
  reviews,
  onLoadMore,
}) => {
  const reviewsList = reviews.data.map((review, index) => {
    const iconColor = review.liked
      ? { fill: '#63B3F3' }
      : { fill: 'transparent', stroke: '#EF9A9A' };
    const iconName = review.liked ? 'heart' : 'thumbsDown';

    const reviewModal = closeModal => (
      <ReportModal
        closeModal={closeModal}
        reviewId={review._id}
        withInfo={false}
        withReviewOptions
      />
    );

    const report = isAuthenticated
      ? reviewModal
      : closeModal => <LoginModal closeModal={closeModal} />;

    return (
      <div key={index}>
        <Flex align="flex-start" my={4}>
          <Icon name={iconName} {...iconColor} size={15} my={1} mx={[2, 3]} />
          <Flex flexDirection="column" flex="1 1 auto">
            <Flex width={1} mb={1} justify="space-between">
              <Name>{`${review.first_name} ${review.last_name || ''}`}</Name>
              <Flex align="center">
                <Modal
                  trigger={
                    <Link href="#" title="Report" secondary small>
                      Report
                    </Link>
                  }
                >
                  {report}
                </Modal>
                <Flex mx={2}>
                  <ReviewDate>᛫</ReviewDate>
                </Flex>
                <ReviewDate>
                  {format(review.created_at, 'MMM DD, YYYY')}
                </ReviewDate>
              </Flex>
            </Flex>
            <Body>{review.text}</Body>
          </Flex>
        </Flex>
        <Divider my={0} />
      </div>
    );
  });

  if (!reviews.data.length) return null;

  return (
    <>
      <Count>Reviews ({reviews.total})</Count>
      {reviewsList}
      {reviews.total > reviews.data.length && (
        <Flex alignSelf="flex-end" mt={4}>
          <Link href="#" title="Load more reviews" onClick={onLoadMore}>
            + Load more
          </Link>
        </Flex>
      )}
    </>
  );
};

export default Reviews;
