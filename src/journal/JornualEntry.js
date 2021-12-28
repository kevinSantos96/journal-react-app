import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote } from '../actions/notes';

export const JornualEntry = ({id,date,titulo,body,url}) => {

    const dispatch = useDispatch();
    const noteDay = moment(date);
  
    const note = {date, titulo, body, url};

    const handleEntryClick=()=>{
        dispatch(activeNote(id, note))
       
    }

    return (
        <div className='journal__entry pointer animate__animated animate__backInDown'
            onClick={handleEntryClick}>

            {
                url &&
                <div className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            >
            </div>}

            <div className='journal_entry-body'>
                <p className='journal__entry-tittle'>
                   {titulo}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>
            
            <div className='journal__entry-date'>
                <span>{noteDay.format('dddd')}</span>
                <h4>{noteDay.format('D')}</h4>

            </div>
        </div>
    )
}
