import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import queryString from 'query-string';
import Icon from '../../elements/Icon';
import * as categories from '../../../../constants/categories';
import { IGetEntriesParams } from '../../../store/entries';
import { getViewMoreLinkURL } from '../../../utils';

const Title = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #85919f;
`;

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64b5f6;
  text-decoration: none;
  transition: color 0.3s ease-out, transform 0.3s ease-out;
  transform: translateZ(0);

  :hover,
  :focus {
    color: #42a5f5;
    transform: scaleX(1.01) translateX(-4px);

    svg path {
      fill: #42a5f5;
    }
  }
`;

interface IProps extends IGetEntriesParams {
  showViewAllLink?: boolean;
  useSortIcons?: boolean;
}

const CardsHeader: React.SFC<IProps> = ({
  category,
  sort,
  showViewAllLink,
  type,
  useSortIcons,
}) => {
  const sectionCategory = categories.categories.find(
    item => item.slug === category
  );
  const sectionSort = categories.sorts.find(item => item.slug === sort);
  const sectionType = categories.types.find(item => item.slug === type);
  const params = { category, sort, type };
  const query = queryString.stringify(params);
  const linkURL = getViewMoreLinkURL(params);
  return (
    <Flex justify="space-between" mb={2}>
      <Flex align="center">
        <Icon
          name={useSortIcons ? sectionSort.icon : sectionType.icon}
          size={useSortIcons ? 22 : 18}
          fill="#C7CFD6"
          mr={3}
        />
        <Title>
          {sort && sectionSort.name} {sectionType.name}
          {sectionCategory && `: ${sectionCategory.name}`}
        </Title>
      </Flex>
      <Flex align="center">
        {showViewAllLink && (
          <Link href={`/${query}`} as={`/${linkURL}`} passHref scroll={false}>
            <ViewAllLink href="#" title={`View all ${type}s`}>
              <span>View all</span>
              <Icon name="arrowRight" size={10} fill="#64B5F6" ml={10} />
            </ViewAllLink>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

CardsHeader.defaultProps = {
  showViewAllLink: true,
  useSortIcons: false,
};

export default CardsHeader;
