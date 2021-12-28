import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { JournalScreen } from '../journal/JournalScreen';
import { NotFoundScreen } from '../journal/NotFoundScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';
import { startLoadNotes } from '../actions/notes';

export const AppRouter = () => {

    const [checking, setchecking] = useState(true)//vereficar si esta autenticado o no
    const [isLoggedIn, setisLoggedIn] = useState(false);

    //guardar la autentificacion de l usuario
    const dispatch = useDispatch()
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, async(user)=>{
            
            if (user?.uid){
                dispatch(login(user.uid, user.displayName));
                setisLoggedIn(true)//si esta logeado de manera correcta
                
                dispatch(startLoadNotes(user.uid));
                
            }else{
                setisLoggedIn(false)
            }
            setchecking(false);
        })
    },[dispatch, setchecking,setisLoggedIn]);

    if(checking){
        return(
            <h1 className='animate__animated animate__bounce animate__delay-2s'>Espere...</h1>
        )
    }


    return (
        <BrowserRouter>
            <Routes>

                <Route path="/auth/*" element={
                    <PublicRoute isAuth={isLoggedIn}>
                        <AuthRouter/>
                    </PublicRoute>
                } />
               


                <Route path="/" element={
                    <PrivateRouter isAuth={isLoggedIn}>
                        <JournalScreen/>
                    </PrivateRouter>
                }/>
                
                

                <Route path="*" element={<NotFoundScreen/>} />
            </Routes>
            
        </BrowserRouter>
    )
}
