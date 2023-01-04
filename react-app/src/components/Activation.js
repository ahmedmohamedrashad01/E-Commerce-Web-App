import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Activation = (props) => {
  const { uid } = useParams();
  const { token } = useParams();

  const [check, setCheck] = useState(false)


  const activateAccount = () => {
    const obj = {
      uid: uid,
      token: token
    }
    console.log(uid);
    console.log(token);
    axios
      .post('http://127.0.0.1:8000/auth/users/activation/',obj)
      .then((res) => setCheck(true))
      .catch((err) => console.log(err));
  };

  return (
    <div>

      <button className="btn btn-primary mt-3" onClick={activateAccount}>Verify Account</button>
      {check?<h4 className = "mt-3">Congrats Your Email Has Been Activated</h4>:''}
    </div>
  );
};

export default Activation;
