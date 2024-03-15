import React from 'react'
import Style from "./Select.module.css"

const Select = (props) => {
    const { data, onChange, name } = props
    return (
        <div className={Style.innerSelect}>
            <select className={Style.select} onChange={onChange} name={name}>
                {
                    data?.length > 0 && data.map((oneOption) => {
                        return <option value={oneOption.value}>{oneOption.title}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Select
