import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 500;
  /* text-transform: uppercase; */
  letter-spacing: 0.05em;
  color: white;
  background-color: #64B5F6;
  border: none;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(25, 118, 210, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s ease-out;

  :hover {
    box-shadow: 0 4px 10px rgba(25, 118, 210, 0.4);
  }
`;

const CustomButton: React.SFC = ({ children, ...restProps }) => (
  <Button {...restProps}>
    {children}
  </Button>
);

export default CustomButton;
