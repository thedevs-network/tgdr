import * as React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { Flex } from 'grid-styled';

interface IImage {
  h?: number | number[];
  mb?: number | number[];
  ml?: number | number[];
  mr?: number | number[];
  mt?: number | number[];
  mx?: number | number[];
  my?: number | number[];
  w?: number | number[];
}

const ImageWrapper = styled(Flex) <IImage>`
  height: ${prop('h')}px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Image: React.SFC<IImage> = ({ w, h, ...props }) => (
  <ImageWrapper h={h} w={w} {...props}>
    <Img src="" alt="" />
  </ImageWrapper>
);

Image.defaultProps = {
  h: 68,
  w: 68,
};

export default Image;