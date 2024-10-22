import { Modal, Form, Select, Spin } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React, { useContext, useMemo, useState } from 'react'
import AppProvider, { AppContext } from '../../../Context/AppProvider'
import { AuthContext } from '../../../Context/AuthProvider';
import { addDocument } from '../../../firebase/services';
import { debounce } from 'lodash';
import { db } from '../../../firebase/config';
function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map(opt => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" style={{ marginRight: '5px' }} src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>


    )
}
async function fetchUserList(search, currentMembers) {
    return db.collection('users').where('keywords', 'array-contains', search).orderBy('displayName').limit(20).get().then(snapshot => {
        return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        })).filter(opt => currentMembers.includes(opt.value));
    })
}
export default function InviteMember() {

    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        form.resetFields();

        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(value => value.value)]
        })
        setIsInviteMemberVisible(false)
    }
    const handleCancel = () => {
        setIsInviteMemberVisible(false)
    }
    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        currentMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}
