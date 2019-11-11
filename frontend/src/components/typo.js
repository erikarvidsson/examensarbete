import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.h1`
  font-size: ${props => props.fontSize || "42px"};
  font-weight: ${props => props.fontWeight || "normal"};
  margin-top: ${props => props.marginTop || "12px"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  margin-left: ${props => props.marginLeft || "12px"};
  margin-right: ${props => props.marginRight || "12px"};
  color: ${props => props.color || "#FFFFFF"};
  text-align: ${props => props.textAlign || "center"};
  width: ${props => props.width || "100%"};
`;

const H2Style = styled.h2`
  font-size: ${props => props.fontSize || "38px"};
  font-weight: ${props => props.fontWeight || "normal"};
  margin-top: ${props => props.marginTop || "12px"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  margin-left: ${props => props.marginLeft || "12px"};
  margin-right: ${props => props.marginRight || "12px"};
  color: ${props => props.color || "#FFFFFF"};
  text-align: ${props => props.textAlign || "left"};
  width: ${props => props.width || "100%"};
`;

const H3Style = styled.h3`
  font-family: ${props => props.fontFamily || "Cabin"};
  font-size: ${props => props.fontSize || "22px"};
  font-weight: ${props => props.fontWeight || "normal"};
  margin-top: ${props => props.marginTop || "12px"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  margin-left: ${props => props.marginLeft || "12px"};
  margin-right: ${props => props.marginRight || "12px"};
  color: ${props => props.color || "#FFFFFF"};
  text-align: ${props => props.textAlign || "left"};
  width: ${props => props.width || "100%"};
  height: ${props => props.height || ""};
  overflow: ${props => props.overflow || ""};
  z-index: ${props => props.zIndex};
  position: ${props => props.position || "relative"};
`;

const PStyle = styled.p`
  font-size: ${props => props.fontSize || "16px"};
  font-weight: ${props => props.fontWeight || "normal"};
  top: ${props => props.top};
  margin-left: ${props => props.marginLeft || "12px"};
  height: ${props => props.height};
  margin-right: ${props => props.marginRight};
  margin-top: ${props => props.marginTop || "12px"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  color: ${props => props.color || "#FFFFFF"};
  text-align: ${props => props.textAlign || "left"};
  width: ${props => props.width || "100%"};
  z-index: ${props => props.zIndex};
  overflow: ${props => props.overflow || ""};
  position: ${props => props.position || "relative"};
`;

export const Header = props => {
  return <HeaderStyle {...props}>{props.text}</HeaderStyle>;
};

export const H2 = props => {
  return <H2Style {...props}>{props.text}</H2Style>;
};

export const H3 = props => {
  return <H3Style {...props}>{props.text}</H3Style>;
};

export const P = props => {
  return <PStyle {...props}>{props.text}</PStyle>;
};
