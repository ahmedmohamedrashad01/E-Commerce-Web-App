import React from 'react'

const Footer = () => {
  return (
    // style={{ position: 'absolute',bottom: '0', width:'100%'}}
    <div style={{ position: 'absolute',bottom: '-60px', width:'100%', height:'50px',backgroundColor: "#0F334E"}}
        className='d-flex justify-content-center align-items-center'>

        <footer style={{wordSpacing:'1px', letterSpacing:'2px', fontSize:'15px'}} className='text-light'>All Copyrights Reserved © Ahmed Rashad 2022</footer>
    </div>
  )
}

export default Footer