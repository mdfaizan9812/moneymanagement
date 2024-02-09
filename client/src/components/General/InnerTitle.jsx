import React from 'react'
import Style from "./InnerTitle.module.css"

const InnerTitle = (props) => {
    return (
        <div className={Style.innerContainerTitle}>
            <p>{props.title}</p>
        </div>
    )
}

export default InnerTitle
