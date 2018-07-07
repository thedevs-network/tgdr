import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Container = styled(Flex).attrs({
  px: 15,
  w: [540, 720, 960, 1140],
})``;

export const LightBox = styled(Flex)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 35px rgba(50, 64, 93, 0.08);
`;