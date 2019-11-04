import React from 'react';

const Index = () => {
  let username = sessionStorage.getItem("username");
  return (
    <>
      <h1>Hello {username ? username : 'test' }</h1>

    </>
  );
}

export default Index;
