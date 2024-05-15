import React from "react";
import styled from "styled-components";

const LabelStyle = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyle htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyle>
  );
};

export default Label;
