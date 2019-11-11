import React from "react";
import styled from "styled-components";

const Container = props => {
  const ContainerBox = styled.div`
    margin-top: 80px;
  `;

  return (
      <ContainerBox>
        {props.children}
      </ContainerBox>
)};

export default Container;
