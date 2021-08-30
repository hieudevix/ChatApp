import React from 'react';
import { Row, Col, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
// import firebase, { auth, db } from '../FireBase/config';
import firebase, { auth, db } from '../../firebase/config'
import { useHistory } from 'react-router-dom'
import { addDocument, generateKeywords } from '../../firebase/services';

const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function Login() {


    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }

    return (
        <div>
            <Row justify="center" style={{ height: '800px' }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} >
                        Chat App
                    </Title>
                    <Button type="danger" style={{ width: '100%', marginBottom: '5px' }}>
                        Login by Google
                    </Button>
                    <Button type="primary" onClick={handleFbLogin} style={{ width: '100%', marginBottom: '5px' }}>
                        Login by Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
