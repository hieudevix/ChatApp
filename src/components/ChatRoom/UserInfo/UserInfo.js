import { Button, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { auth, db } from '../../../firebase/config';
import { AuthContext } from '../../../Context/AuthProvider';
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #C9CCD5;
    .username{
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {
    // useEffect(()=>{
    //     db.collection('users').onSnapshot((snapshot)=>{
    //         const data = snapshot.docs.map(doc=>({
    //             ...doc.data(),
    //             id: doc.id
    //         }))
    //     })
    // },[])
    const { user:{displayName, photoURL}} = useContext(AuthContext);
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.chartAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button onClick={()=>{
                auth.signOut();
            }} ghost>Đăng Xuất</Button>
        </WrapperStyled>
    )
}
