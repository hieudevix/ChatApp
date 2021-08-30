import { Modal, Form, Input } from 'antd'
import React, { useContext } from 'react'
import AppProvider, { AppContext } from '../../../Context/AppProvider'
import { AuthContext } from '../../../Context/AuthProvider';
import { addDocument } from '../../../firebase/services';

export default function AddRoom() {

    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
    const {user:{uid}} = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () =>{
        // add new room 
        console.log({formData:form.getFieldValue()});
        addDocument('rooms',{...form.getFieldValue(), members:[uid]})
        form.resetFields();
        setIsAddRoomVisible(false)
    }
    const handleCancel = () =>{
        setIsAddRoomVisible(false)
    }
    return (
        <div>
            <Modal
                title="Tạo Phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên Phòng" name="name">
                        <Input placeholder="Nhập tên phòng"/>
                    </Form.Item>
                    <Form.Item label="Mô Tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
