import React from 'react'
import Style from "./Input.module.css"

const Input = (props) => {

    return (
        <div className={Style.innerInput}>
            <input
                type={props.type}
                name={props.name}
                className={Style.input}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input
