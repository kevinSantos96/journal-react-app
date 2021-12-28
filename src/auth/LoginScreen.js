 import React from 'react'
import { isCompositeComponent } from 'react-dom/cjs/react-dom-test-utils.production.min'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'//nos importa un hook
import { Link } from 'react-router-dom'
import { starGoogle, starLoginEmailPassword } from '../actions/auth'
import { useForm } from '../hooks/useForm'
 
 export const LoginScreen = () => {

    const dispatch = useDispatch();

    const {loading} = useSelector( state=>state.ui)
    

    const [formValues, handleInputChange ] = useForm({
        email:'',
        password:''

    });

    const { email, password} = formValues; // destruturar el formValues que recibe

    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(starLoginEmailPassword(email,password)); //lo exportamos desde nuestar accion de auth
    }

    const handleGoogleLogin = ()=>{
        dispatch(starGoogle());
    }

     return (
         <>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit={ handleLogin } className='animate__animated animate__fadeIn'>

                <input
                type="text"
                placeholder='Correo'
                name='email'
                className='auth__input'
                value = {email}
                onChange={handleInputChange}
                />

                <input
                type="password"
                placeholder='Contraseña'
                name='password'
                className='auth__input'
                value = {password}
                onChange={handleInputChange}
                />

                <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled = {loading}
                >
                    Ingresar
                </button>


                <div className='auth__social-networks'>
                    <p>Ingresar Con:</p>
                    <div className="google-btn"
                        onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className='link'>
                    Registrarse
                </Link>	
            </form>
           
         </>
     )
 }
 