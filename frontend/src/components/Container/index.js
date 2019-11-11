import React from "react";
import styled from "styled-components";

const ContainerBox = styled.div`
  margin-top: ${props => props.marginTop || "80px"};
`;
export const Container = props => {
  return <ContainerBox {...props}>{props.children}</ContainerBox>;
};

export default Container;
