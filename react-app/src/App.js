import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from 'axios';
const App = () => {


  // useEffect(()=>{
  //   axios
  //     .get(`http://127.0.0.1:8000/api/cart/?search=${localStorage.getItem("email")}`)
  //     .then((res)=>{
  //      localStorage.setItem('qty',res.data.length)
  //     })
  //     .catch(err=>console.log(err))
  // })

  return (
    <div className="container mt-2" style={{minHeight:'calc(100vh - 60px)', position:'relative'}}>

      {!navigator.onLine?<h4 className="text-danger">No Internet Connection!</h4>:''}
      <NavBar />

      <Footer/>
    </div>
  );
};

export default App;
