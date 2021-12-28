import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'
import { NotFoundScreen } from '../journal/NotFoundScreen'

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className='auth__box-conteiner'>
                <Routes>
                    <Route path="/login" element={<LoginScreen/>} />

                    <Route path="/register" element ={<RegisterScreen />}/>

                    <Route path="*" element={<NotFoundScreen/>} />

                </Routes>

            </div>


        </div>
    )
}
