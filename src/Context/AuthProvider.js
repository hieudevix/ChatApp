import React, { createContext, useEffect, useState } from 'react';
import {auth} from '../firebase/config'
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = createContext();
export default function AuthProvider( {children}) {

    const [user, setUser] = useState({}); 
    const [loading, setIsLoading] = useState(true);
    const history = useHistory();
    useEffect(()=>{
        const unsubscribed = auth.onAuthStateChanged((user)=>{
            console.log('user',{user});
            if(user){
                const {displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                })
                setIsLoading(false);
                history.push("/");
            }
            else{
                setIsLoading(false);
                history.push("/login");
            }
            
        })
        // clean function
        return () =>{
            unsubscribed();
        }
    },[history])

    return (
        <AuthContext.Provider value={{user}}>
            {loading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}
