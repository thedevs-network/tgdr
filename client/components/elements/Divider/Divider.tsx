import styled from 'styled-components';
import { Box } from 'grid-styled';

const CustomHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ededed;
  border: none;
  outline: none;
  border-radius: 2px;
`;

interface IDivider {
  mb?: number;
  mt?: number;
  my?: number;
}

const Divider: React.SFC<IDivider> = ({ my }) => (
  <Box my={my}>
    <CustomHr />
  </Box>
);

Divider.defaultProps = {
  my: 4,
};

export default Divider;
