import React, { createContext, useContext, useMemo, useState } from 'react';
import {auth} from '../firebase/config'
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { AuthContext } from './AuthProvider';
import useFireStore from '../hooks/useFireStore';

export const AppContext = createContext();
export default function AppProvider( {children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const { user: { uid } } = useContext(AuthContext);
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])
    const rooms = useFireStore('rooms', roomsCondition);

    const selectedRoom = useMemo(()=>{
        
        return rooms.find(room => room.id === selectedRoomId) || {}
    },[rooms, selectedRoomId])

    const membersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members])

    const members = useFireStore('users', membersCondition);


    return (
        <AppContext.Provider value={{rooms, members, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId, isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom}}>
            { children}
        </AppContext.Provider>
    )
}
