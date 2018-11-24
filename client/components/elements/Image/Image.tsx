import * as React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { Flex } from 'grid-styled';
import { Image as CloudinaryImage } from 'cloudinary-react';
import media from 'styled-media-query';

interface IProps {
  nophoto?: boolean;
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

const ImageWrapper = styled(({ h, w, ...rest }: Partial<IProps>) => (
  <Flex {...rest} />
))`
  height: ${prop('h')}px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;

  ${props =>
    props.h &&
    media.lessThan('470px')`
    height: ${p => p.h / 1.1}px;
    width: ${p => p.h / 1.1}px;
  `};
`;

const Img = styled(CloudinaryImage)`
  width: 100%;
  height: 100%;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

const Image: React.SFC<IProps> = ({ w, h, nophoto, username, ...props }) => (
  <ImageWrapper h={h} w={w} {...props}>
    <Img
      cloudName="the-devs"
      publicId={nophoto ? '__placeholder__' : username}
      alt={username}
      secure
    />
  </ImageWrapper>
);

Image.defaultProps = {
  h: 68,
  nophoto: false,
  w: 68,
};

export default Image;
