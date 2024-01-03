import React from 'react'
import Style from "./AppHeader.module.css"

const AppHeader = (props) => {
    return (
        <div className={Style.container}>
            <header>{props.title}</header>
        </div>
    )
}

export default AppHeader