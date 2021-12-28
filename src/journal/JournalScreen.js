import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelect } from './NothingSelect'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active}=useSelector(stete=>stete.notes)


    return (
        <div className='journal__main-content animate__animated animate__fadeIn'>
            <Sidebar  />

            <main>

                {
                    ( active )?(<NoteScreen />):( <NothingSelect />)

                }
              
                
            </main>

        </div>
    )
}
