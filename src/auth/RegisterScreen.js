import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmail } from '../actions/auth';
import { removeError, setErro } from '../actions/ui';

import { useForm } from '../hooks/useForm'


export const RegisterScreen = () => {

    
    const dispatch = useDispatch();
    const {msgError}= useSelector( state=>state.ui );
    

    const [ formValues, handleInputChange, reset] = useForm({
        name:'',
        email:'',
        password: '',
        password2:''

    })

    const { name, email, password,password2} = formValues;

    const handleRegister=(e)=>{
        e.preventDefault();
        //llamar la funcion de validacion
        if(isFormValid()){ // se dispara si la funcion regresa true
            dispatch(startRegisterWithEmail(email,password, name));
        } 

        reset();
    }

    //funcion para validar formulario
    const isFormValid = ()=>{

        if(name.trim().length===0){
            dispatch(setErro('nombre requerido'));
            return false;

        } else if( !validator.isEmail(email) ){
            dispatch(setErro('El correo no es valido'));
            return false;

        }else if( password!== password2 || password.length<= 5){
            dispatch(setErro('La contraseña no coenciden o es muy corta'));
            return false
        }
        
        dispatch(removeError())
        return true;
    }
    
    return (
        <>
        <h3 className='auth__title'>Regístrate</h3>
        <form onSubmit={handleRegister} className='animate__animated animate__fadeIn'>
            {
                msgError &&
                (<div className='auth__alert-error'>
                   {msgError}
                </div>)
            }
            <input
            type="text"
            placeholder='Nombre'
            name='name'
            className='auth__input'
            autoComplete='off'
            value={name}
            onChange={handleInputChange}
            /> 

            <input
            type="text"
            placeholder='Correo'
            name='email'
            className='auth__input'
            value={email}
            onChange={handleInputChange}
            />

            <input
            type="password"
            placeholder='Contraseña'
            name='password'
            className='auth__input'
            value={password}
            onChange={handleInputChange}
            />

            <input
            type="password"
            placeholder='Confirmar Contraseña'
            name='password2'
            className='auth__input'
            value={password2}
            onChange={handleInputChange}
            />

            <button
            type='submit'
            className='btn btn-primary btn-block mb-5'
            >
                Regístrarse
            </button>

            <Link to="/auth/login" className='link'>
                Ya estas registrado?
            </Link>	
        </form>
       
     </>
    )
}
