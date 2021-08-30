import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../Context/AuthProvider';

const WarapperStyled = styled.div`
    margin-bottom: 10px;
    display:flex;
    .author{
        display:block;
        margin-left: 5px;
        margin-bottom:5px;
        color: #72808b;
        font-weight: bold;
    }
    .date{
        display:block;
        margin-left:5px;
        font-size:11px;
        color: #a7a7a7;
    }
    .content{
        margin-left:5px;
        font-size:16px;
    }
`;
const MessageContentStyled = styled.div`
    background:white;
    border-radius:0 10px 10px 10px;
    margin: 0 10px;
    padding:10px;
    box-shadow: 0 1px 0 0 #ccc;
`;
function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}
export default function Message({ text, displayName, createAt, photoURL, uid }) {
    const { user } = useContext(AuthContext);
    if (uid === user.uid) {
        return <WarapperStyled style={{ justifyContent: 'flex-end' }}>
            <MessageContentStyled style={{ borderRadius: '10px 0 10px 10px', background: '#e5efff' }}>
                <Typography.Text className="content">{text}</Typography.Text>
                <Typography.Text className="date">{formatDate(createAt?.seconds)}</Typography.Text>
            </MessageContentStyled>
            <Avatar src={photoURL}>
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
        </WarapperStyled>
    }
    return (
        <WarapperStyled >
            <Avatar src={photoURL}>
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <MessageContentStyled>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="content">{text}</Typography.Text>
                <Typography.Text className="date">{formatDate(createAt?.seconds)}</Typography.Text>
            </MessageContentStyled>
        </WarapperStyled>
    )
}
