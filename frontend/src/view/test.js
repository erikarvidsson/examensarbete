// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import Modal from "../components/Modal";
// import Text from "../components/Text";
// import EdditInput from "../components/EdditInput";

// const Index = () => {
//   const [name, setName] = useState()
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/users/${sessionStorage.getItem("id")}`)
//       .then(res => {
//         setName(res.data.username);
//       });
//   }, []);

  
//     useEffect(() => {
//       axios.get(`http://localhost:5000/${props.link}`).then(res => {
//         setApartment(res.data);
//       });
//     }, []);

//   // const testInput = {
//   //   name: name,
//   //   email: email,
//   //   adress: adress,
//   //   description: description,
//   //   date: date
//   // };


//   return (
//     <>
//       <Modal>
//         <Text text={`Hej Hej  ${name}`}></Text>
//         <EdditInput
          
//         />
//       </Modal>
//     </>
//   );
// };

// export default Index;
