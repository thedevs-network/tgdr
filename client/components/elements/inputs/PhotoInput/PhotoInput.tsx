import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import ReactDropzone from 'react-dropzone';
import Icon from '../../Icon';

const Dropzone = styled(ReactDropzone)`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #BBB;
  border-radius: 100%;
  cursor: pointer;
  transform: translateZ(0);
  transition: transform 0.3s ease-out, border-color 0.3s ease-out;

  :hover {
    border-color: #AAA;
    transform: scale(1.01, 1.01) translateY(-2px) translateZ(0);

    svg path {
      fill: #AAA;
    }
  }
`;

const PhotoInput: React.SFC = (props) => (
  <Flex {...props} align="center" justify="center" pb={4}>
    <Dropzone
      name="photo"
      accept="image/jpeg, image/png"
      maxSize={150000}
      multiple={false}
      onDrop={null}
      onDropRejected={null}
    >
      <Icon name="camera" size={32} fill="#B8B8B8" />
    </Dropzone>
  </Flex>
);

export default PhotoInput;