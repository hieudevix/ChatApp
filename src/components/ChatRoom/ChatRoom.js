import React from 'react'
import { Row, Col } from 'antd';
import SildeBar from './SildeBar/SildeBar';
import ChatWindow from './ChatWindow/ChatWindow';

export default function ChatRoom() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <SildeBar />
                </Col>
                <Col span={18}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    )
}
