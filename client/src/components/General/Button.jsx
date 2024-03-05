import React from 'react'
import Style from "./Button.module.css"

const Button = (props) => {
    return (
        <div className={Style.innerContainerButton}>
            <button
                className={`${Style.button} ${props.disabled ? Style.opacityButton : ""}`}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                Submit
            </button>
        </div>
    )
}

export default Button