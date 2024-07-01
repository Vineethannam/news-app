import React, { Component } from 'react'
import loading from "./loading.gif"

const Spinner = ()=> {

    return (
      <div className='text-center'>
        <img src={loading} style={{height:"5rem"}} alt="loading" />
      </div>
    )
}

export default Spinner
