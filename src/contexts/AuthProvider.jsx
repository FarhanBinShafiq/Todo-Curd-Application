import React, { createContext, useEffect, useState } from "react";
import app from '../firebase/firebase.config'
 
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";



export const AuthContext = createContext();

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //Crate Account

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //SignIn Account with email and passowrd
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    ///Log Out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //outhtate change for ensuring the current user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User Observing')
            setUser(currentUser)
            setLoading(false)
        })
    }

        , [])

    //update user porfile

    const updateUser = (userInfo) => {
        return updateProfile(user, userInfo)
    }

    ///Value 

    const authInfo = {
        createUser,signIn,logOut,user,updateUser,loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;