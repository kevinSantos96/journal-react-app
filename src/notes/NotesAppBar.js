import React from 'react'
import moment from 'moment'
import 'moment/locale/es';



import { useDispatch, useSelector } from 'react-redux'
import { SaveNote, startFileUp } from '../actions/notes'

export const NotesAppBar = () => {
    moment.locale('es'); // aca ya esta en es
    const dispatch = useDispatch()

    const {active} = useSelector(state => state.notes)
    // console.log(active.date);

    const date = moment(active.date);

    const handleSave=()=>{
        dispatch(SaveNote(active))
    }

    //funcion onclik subir imagen
    const handlePictureUp=()=>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange= (e)=>{
        const file = e.target.files[0];

        if(file){
            dispatch(startFileUp(file))
        }
    }

    return (
        <div className='notes__appbar'>
            <span>{date.format('LL')}</span>

            <input  id='fileSelector'
                    type='file'
                    name='file'
                    style={{display: 'none'}}
                    onChange={handleFileChange}
            />
            <div>
                <button className='btn' onClick={handlePictureUp}>
                    Imagen
                </button>

                <button className='btn' onClick={handleSave}>
                    Guardar
                </button>
            </div>
            
        </div>
    )
}
