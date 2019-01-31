import styled from 'styled-components';
import { Flex } from '@rebass/grid';

export const AppLoadingWrapper = styled(Flex).attrs({
  alignItems: 'center',
  flex: '1 1 auto',
  justifyContent: 'center',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const AppWrapper = styled(Flex).attrs({
  flex: '1 1 auto',
  flexDirection: 'column',
  justifyContent: 'space-between',
})`
  min-height: 100vh;
`;

export const Container = styled(Flex).attrs({
  px: [10, 15],
  width: [540, 720, 960, 1140],
})`
  max-width: 100%;
`;

export const LightBox = styled(Flex)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 35px rgba(50, 64, 93, 0.08);
`;
