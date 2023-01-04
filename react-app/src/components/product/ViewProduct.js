import React, {useEffect} from "react";
// import axios from "axios";

import { useSelector } from "react-redux";
const ViewProduct = () => {

  // useSelector is important because its doing rerender and useDispatch.
  const item = useSelector((state) => state.products.item);

  // console.log('id: '+localStorage.getItem('id'));
  const Name = localStorage.getItem('name')
  const description = localStorage.getItem('description')
  const category = localStorage.getItem('category')
  const price = localStorage.getItem('price')
  const image = localStorage.getItem('image')

  return (
    <div className="p-2 w-100 m-auto text-center mt-2">

     <p style={{color:'#888'}} className="fw-bolder">Product: {Name}</p>
        <p style={{color:'#888'}} className="fw-bolder">Description: {description}</p>
        <p style={{color:'#888'}} className="fw-bolder">Category: {category}</p>
        <p style={{color:'#888'}} className="fw-bolder">Price: {price} $</p>

        <div style={{width:'200px', height:'240px'}} className="hoverElement m-auto d-flex justify-content-center align-items-center">
            <img style={{width:'100%', height:'100%'}} className='mt-3' src={image}/>
        </div>
    </div>
  );
};

export default ViewProduct;
