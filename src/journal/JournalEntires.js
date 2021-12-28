import React from 'react'
import { useSelector } from 'react-redux'
import { JornualEntry } from './JornualEntry'

export const JournalEntires = () => {

    const {notes} = useSelector(state=>state.notes);//obtener los datos de memoria


    return (
        <div className='journal__entries'>
            {
                notes.map(value=>(
                    <JornualEntry key={ value.id }
                                    {...value} />
                ))
            }
        </div>
    )
}