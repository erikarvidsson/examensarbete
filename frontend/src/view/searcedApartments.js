// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import FormData from "form-data";
// import axios from "axios";
// import styled from "styled-components";

// import { P, H3, Header } from "../components/typo";
// import { Input, Button, Textarea } from "../components/Input";
// import Modal from "../components/Modal";
// import Modal2 from "../components/Modal2";
// import EdditInput from "../components/EdditInput";
// import Container from "../components/Container";
// import { set } from "date-fns";

// const Wrapper = styled.div`
//   margin-top: 40px;
//   form {
//     .inputfile {
//       display: none;
//     }
//     .inputfileLabel {
//       height: 51px;
//       width: 328px;
//       border-radius: 100px;
//       padding: 14px 30px;
//       background-color: white;
//       box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
//       cursor: pointer;
//     }
//   }
// `;
// const ImgDiv = styled.div`
//   width: 100vw;
//   height: 300px;
//   overflow: hidden;
//   object-fit: cover;
//   /* top: 0; */
//   img {
//     width: 100%;
//   }
// `;

// const Img = styled.img`
//   height: 100px;
// `;

// const DisplayBox = styled.div`
//   height: 100px;
//   /* width: 80vw;
//   margin-top: 3%; */
//   /* margin-bottom: 30px; */
//   /* border-radius: 5px; */
//   overflow: hidden;

//   display: flex;
//   img {
//     width: 100%;
//     overflow: hidden;
//     object-fit: cover;
//   }
//   .imgBox {
//     width: 40%;
//   }
//   div {
//     width: 60%;
//   }
// `;

// const ContentBox = styled.div`
//   overflow-x: hidden;
//   overflow-y: scroll;
//   height: 100%;
// `;

// const Apartmentlist = () => {
//   const [apartments, setApartments] = useState([{}]);
//   const [search, setSearch] = useState([{}]);

//   const user = sessionStorage.getItem("id");
//   const admin = sessionStorage.getItem("admin");

//   console.log(apartments);
//   // console.log(search);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/data/`).then(res => {
//       setApartments(res.data);
//     });

//     axios.get(`http://localhost:5000/SApt/`).then(res => {
//       setSearch(res.data);
//     });
//   }, []);

//   const getApartments = () => {
//     return search.map(sapt => {
//       if (sapt.userId === user) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   };

//   useEffect(() => {
//     setSearch(getApartments());
//   }, []);

//   console.log(search)

  

//   const haveSearchAppartment = dataId => {
//     axios.get(`http://localhost:5000/SApt/${dataId}`).then(res => {
//       if (res.data && res.data.userId === user) {
//         // setNoSearch(noSearch => [...noSearch, res.data.dataId]);
//         console.log(res.data);
//         return true;
//       } else {
//         return false;
//       }
//     });
//     // .then(res => setNoSearch([...noSearch, res.data]));
//   };

//   const searchApartment = dataId => {
//     const search = {
//       userId: sessionStorage.getItem("id"),
//       dataId: dataId
//     };

//     axios
//       .post("http://localhost:5000/SApt/add", search)
//       .then(res => console.log(res));
//     // window.location.href = "/apartmentlist";
//   };

//   return (
//     <Container>
//       <Header text="Sökta lägenheter" marginLeft="0" />
//       {search.map(sapt => {
//         return(
//         // if(sapt.dataId === apartments.map(apts => {
//         //             // console.log(apts)
//         //             console.log(apts.adress)
//         //             // console.log(apts.information);
//         //             return (
//         //               <DisplayBox>
//         //                 <div className="imgBox">
//         //                   <Img
//         //                     src={`http://localhost:5000/${apts.img}`}
//         //                     alt=""
//         //                     key={apts._id}
//         //                   />
//         //                 </div>
//         //                 <div>
//         //                   <H3
//         //                     text={apts.adress}
//         //                     marginTop="0"
//         //                     marginBottom="0"
//         //                   ></H3>
//         //                   <P
//         //                     text={apts.description}
//         //                     marginTop="0"
//         //                     fontSize="12px"
//         //                   ></P>
//         //                 </div>
//         //                 <hr />
//                       </DisplayBox>
//                     );
//          }))
//         )
//       })}
//     </Container>
//   );
// };

// export default Apartmentlist;
