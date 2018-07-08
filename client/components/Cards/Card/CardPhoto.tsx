import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const PhotoWrapper = styled(Flex).attrs({
  width: [68]
})`
  height: 68px;
  margin-right: 16px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

const CardPhoto: React.SFC = () => (
  <PhotoWrapper>
    <Photo src="" alt="" />
  </PhotoWrapper>
);

export default CardPhoto;