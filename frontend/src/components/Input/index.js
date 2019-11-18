import React from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  height: ${props => props.height || "50px"};
  width: 328px;
  border-radius: 25px;
  /* background-color: rgba(200, 200, 200, 0.16); */
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  padding-left: 12px;
  padding-right: 12px;
  padding-top: ${props => props.paddingTop || '12px'};
`;

const TextareaStyled = styled.textarea`
  border: 0;
  height: ${props => props.height || "50px"};
  width: 328px;
  border-radius: 25px;
  /* background-color: rgba(200, 200, 200, 0.16); */
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
`;

const ButtonStyled = styled.div`
  display: inline;
  border: 0;
  border-radius: 25px;
  /* background-color: rgba(200, 200, 200, 0.16); */
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 12px;
  padding-bottom: 12px;
  height: ${props => props.height || "50px"};
  width: 228px;
  :active {
    box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.2);
  }
`;


export const Input = props => {
  return <InputStyled {...props} />;
};
export const Textarea = props => {
  return <TextareaStyled {...props} />;
};
export const Button = props => {
  return <ButtonStyled {...props} > { props.text } </ButtonStyled>;
};

