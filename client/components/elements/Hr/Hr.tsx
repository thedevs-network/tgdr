import styled from 'styled-components';
import { Box } from 'grid-styled';

const CustomHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #EDEDED;
  border: none;
  outline: none;
  border-radius: 2px;
`;

interface IHr {
  mb?: number;
  mt?: number;
  my?: number;
}

const Hr: React.SFC<IHr> = ({ my }) => (
  <Box my={my}>
    <CustomHr />
  </Box>
);

Hr.defaultProps = {
  my: 4,
};

export default Hr;