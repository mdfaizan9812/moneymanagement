import React from 'react'
import Style from "./InnerLogo.module.css"

const InnerLogo = ({ children }) => {
  return (
    <div className={Style.innerContainerLogo}>
      {children}
    </div>
  )
}

export default InnerLogo
