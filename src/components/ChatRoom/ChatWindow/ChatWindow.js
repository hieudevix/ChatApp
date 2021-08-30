import { UserAddOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Tooltip, Form, Input, Alert } from 'antd'
import { set } from 'lodash';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../Context/AppProvider';
import { AuthContext } from '../../../Context/AuthProvider';
import { addDocument } from '../../../firebase/services';
import useFireStore from '../../../hooks/useFireStore';
import Message from '../Message/Message';

const HeaderStyled = styled.div`
    background:white;
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid #F0D9FF;
    .header{
        &__info{
            display: flex;
            // flex-direction: column;
            align-items: center;
            justify-content: center;

        }
        &__avatar{
            margin-right:10px;
        }
        &__title{
            font-size:20px;
            margin: 0;
            font-weight: 600;
        }
        &__description{
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const WrapperStyled = styled.div`
    height: 100vh;
    background:#e1e2e4;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
`

const MessageListStyled = styled.div`
    padding: 0 5px;
    max-height:100%;
    overflow-y:auto;
    // text-align:right;
`;

const FormStyled = styled(Form)`
    background:white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;
    .ant-form-item {
        flex:1;
        margin-bottom:0;
    }
`

export default function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const { user: { uid, photoURL, displayName } } = useContext(AuthContext);
    const messagesEndRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['message']);
    }
    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id])
    const messages = useFireStore('messages', condition)
    return (
        <WrapperStyled>
            {selectedRoom.id ? (<>
                <HeaderStyled>
                    <div className="header__info">
                        <div className="header__avatar">
                            <Avatar.Group size="medium" maxCount={2}>
                                {members.map((member) => {
                                    return <Tooltip title={member.displayName} key={member.id}>
                                        <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.chartAt(0).toUpperCase()}</Avatar>
                                    </Tooltip>
                                })}
                            </Avatar.Group>
                        </div>
                        <div className="header__content">
                            <p className="header__title">{selectedRoom.name}</p>
                            <span className="header__desscription">{selectedRoom.description}</span>
                        </div>
                    </div>
                    <ButtonGroupStyled>
                        <Button onClick={() => setIsInviteMemberVisible(true)} type="text" icon={<UserAddOutlined />}>Mời</Button>
                        <Button icon={<SearchOutlined />} type="text"></Button>
                    </ButtonGroupStyled>
                </HeaderStyled>
                <ContentStyled>
                    <MessageListStyled >
                        {
                            messages.map(mes => {
                                if (mes.uid == uid) {
                                    return <Message uid={mes.uid} key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createAt={mes.createdAt}>
                                    </Message>
                                } else {
                                    return <Message uid={mes.uid} key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createAt={mes.createdAt}>
                                    </Message>
                                }
                            })
                        }
                    </MessageListStyled>
                    <FormStyled form={form}>
                        <Form.Item name="message">
                            <Input onChange={handleInputChange} onSubmit={handleOnSubmit} onPressEnter={handleOnSubmit} placeholder="Nhập tin nhắn..." bordered={false} autoComplete="off" />
                        </Form.Item>
                        <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                    </FormStyled>
                </ContentStyled>
            </>) : <Alert message="Hãy chọn phòng" type="info" showIcon style={{ margin: 5 }} closable />}

        </WrapperStyled>
    )
}
