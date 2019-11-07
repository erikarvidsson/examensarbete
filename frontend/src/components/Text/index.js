import React, { useState } from "react";

const Text = props => {
  // const [openText, setOpenText] = useState(false);

  return (
    <>
      <p>   
        {props.text} 
      </p>
    </>
  );
};

export default Text;
