import * as React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { Flex } from 'grid-styled';
import { Image as CloudinaryImage } from 'cloudinary-react';

interface IProps {
  username: string;
  h?: number | number[];
  mb?: number | number[];
  ml?: number | number[];
  mr?: number | number[];
  mt?: number | number[];
  mx?: number | number[];
  my?: number | number[];
  w?: number | number[];
}

const ImageWrapper = styled(Flex)<IProps>`
  height: ${prop('h')}px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled(CloudinaryImage)`
  width: 100%;
  height: 100%;
`;

const Image: React.SFC<IProps> = ({ w, h, ...props }) => (
  <ImageWrapper h={h} w={w} {...props}>
    <Img cloudName="the-devs" publicId={props.username} alt={props.username} />
  </ImageWrapper>
);

Image.defaultProps = {
  h: 68,
  w: 68,
};

export default Image;
