import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFireStore = (collection, condition) => {
    const [document, setDocument] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');
        if (condition) {
            // collectionRef.where('name', '==', 'hieu')
            if (!condition.compareValue || !condition.compareValue.length) { return; }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(documents);
        })
        return unsubscribe;
    }, [collection, condition])
    return document;
}

export default useFireStore;