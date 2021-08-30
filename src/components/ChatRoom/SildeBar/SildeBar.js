import React from 'react'
import { Row, Col } from 'antd'
import UserInfo from '../UserInfo/UserInfo'
import RoomList from '../RoomList/RoomList'
import styled from 'styled-components';

const SildebarStyled = styled.div`
    background: #93B5C6;
    color: white;
    height: 100vh;

`;
export default function SildeBar() {
    return (
        <SildebarStyled>
            <Row>
                <Col span={24}><UserInfo/></Col>
                <Col span={24}><RoomList/></Col>
            </Row>
        </SildebarStyled>
    )
}
