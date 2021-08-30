import { Button, Collapse, Typography } from 'antd'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import useFireStore from '../../../hooks/useFireStore';
import { AuthContext } from '../../../Context/AuthProvider';
import { AppContext } from '../../../Context/AppProvider';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header, p{
            color:white;
        }
        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-room{
            color:white;
            padding:0 5px;
            // background: #B4AEE8;
            border-radius: 3px;
        }
    }
    
`;

const LinkStyled = styled(Typography.Link)`
    display:block;
    margin-bottom: 5px;
    color: white;
`
export default function RoomList() {
    /* 
    {
        name:'room name',
        description: 'mo ta',
        members: [uid1, uid2],
    }
     */
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key={1}>
                {rooms.map(room => <LinkStyled style={{ color: 'white' }} key={room.id} onClick={() => {
                    setSelectedRoomId(room.id)
                }}>- {room.name} <SmileTwoTone /></LinkStyled>)}
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>Thêm Phòng</Button>
            </PanelStyled>

        </Collapse>
    )
}
