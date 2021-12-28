
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, getAuth ,  signInWithEmailAndPassword,  signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import {noteLogout} from "./notes";
//accion asincrona

//iniciar sesion con correp
export const starLoginEmailPassword=(email, password)=>{// va regresarun callback
    return(dispatch)=>{//definimos el dispatch

        dispatch(startLoading());

        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
             dispatch( login (user.uid, user.displayName)); //hacemos dispach de funcion login
             dispatch(finishLoading());
             
        }).catch(err=>{
            console.log(err);
            dispatch(finishLoading());
            Swal.fire('Error', err.message, 'error')
        })
        
       
    }
}

//crar una nueva cuenta
export const startRegisterWithEmail=(email,password,name)=>{
    return( dispatch )=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user})=>{
                await updateProfile(auth.currentUser,{displayName: name})//para obtener el display name
               
                dispatch(login(user.uid, user.displayName))
            }).catch(err=>{
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            });
    }
}

//autentificarse con google
export const starGoogle = ()=>{
    return(dispatch)=>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user})=>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}



//inicio de session
export const login = (uid, displayName)=>({
        type: types.login,
        payload:{
            uid,
            displayName
        } 
});

//loggout

export const startLogout =()=>{
    return async (dispatch)=>{
        const auth = getAuth();
       await signOut(auth);
       
       dispatch(logout());
       dispatch(noteLogout());
    }
}

export const logout = ()=>({
    type:types.logout
})