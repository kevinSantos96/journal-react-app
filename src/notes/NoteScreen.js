import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, starDelete } from '../actions/notes';
import { useForm } from '../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes);//hacemos referencia a la notas activa
    const [formValues, handleInputChange, reset]=useForm(note);//usamos nuestro hook para extraer la informacion en pantalla
    const {body, titulo, id} = formValues;

    const activeId =  useRef(note.id);//va guardar la referencia del id
    
    useEffect(() => {
        if(note.id!==activeId.current){//solo se dispare cuando sea distintos
            reset(note);
            activeId.current = note.id;
        }
        
    }, [note,reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id,{...formValues}))
    }, [formValues, dispatch])


    //Elimar nota
    const handleDelete=()=>{
        dispatch(starDelete(id));
    }

    return (
        <div className='notes__main-content'>
            
            <NotesAppBar/>
            
            <div className="notes__content">
                <input
                    type="text"
                    placeholder='Escribir...'
                    className='notes__title-input'
                    autoComplete='off'
                    name='titulo'
                    value={titulo}
                    onChange={ handleInputChange}
                />
                <textarea placeholder="Que hay para hoy?" className="notes__textarea" value={body}
                         name='body' onChange={ handleInputChange} >
                </textarea>

                {
                    (note.url)&&
                    (<div className='note__image'>
                    <img src={note.url}
                        alt="iamgen"/>
                    </div>)
                }
            </div>
                <button className='btn btn-danger fa fa-trash-o'
                        onClick={handleDelete}>
                    Eliminar
                </button>
        </div>
    )
}
