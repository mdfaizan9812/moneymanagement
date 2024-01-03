import { Button, Modal } from 'antd'
import React from 'react'

const AppAlert = ({ title, isOpen, setIsOpen, id, featureName, setCurrentRecord, handleDelete }) => {

    function handleCancel() {
        setIsOpen(false);
        setCurrentRecord({});
    }

    return (
        <>
            <Modal
                title={title}
                open={isOpen}
                onCancel={handleCancel}
                footer={
                    [
                        <Button type="primary" onClick={handleDelete}>Yes</Button>,
                        <Button onClick={handleCancel}>No</Button>
                    ]
                }
                centered={true}
            >
                <br />
                <p>Would you like to delete <span style={{ fontWeight: "900", color: "red" }}>{id}</span> {featureName}?</p>
                <br />
            </Modal>
        </>
    )
}

export default AppAlert