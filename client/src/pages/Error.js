import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    console.log(error);
  return (
    <div>Something went wrong
        <p>{error.data}</p>
    </div>
  )
}

export default Error