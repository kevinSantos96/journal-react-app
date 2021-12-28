
import { addDoc, collection, deleteDoc, doc, updateDoc} from "firebase/firestore"
import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"




export const startNewNote = ()=>{
    return async(dispatch, getState)=>{ // el segubndo argumento nos sirve para obtener el state

        const {uid} = getState().auth //para obtener el uid del la persona logeada
        // console.log(uid)

        const newNote ={
            titulo: '',
            body: '',
            date: new Date().getTime()
        }
        

        const docRef = await addDoc(collection(db,`${uid}/journal/notes`),newNote);//hacer una nueva entrada
        // console.log(docRef);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));

    }
}   
//activar la pantalla para escribir mandamos el id de docRef y newnote
export const activeNote = (id, note)=>({
    type: types.notesActivite,
    payload:{
        id,
        ...note
    }
})
//añadir una nueva nota a la barra lateral
export const addNewNote=(id, note)=>({
    type: types.notesAddNew,
    payload:{
        id,...note
    } 
})


//mostar las notas memoria
export const startLoadNotes=(uid)=>{
    return async(dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNote(notes))
    }
}
//cargar las notes
export const setNote = (notes) =>({
    type: types.notesLoad,
    payload:notes
});


export const SaveNote=(note)=>{
    return async(dispatch, getState)=>{
        const {uid} = getState().auth; 

        if(!note.url){//si no hay url se elimina
            delete note.url;
        }
        
        const noteFirestore = {...note};
        delete noteFirestore.id;



        const docRef = doc(db,`${uid}/journal/notes/${note.id}`);//update note
        await updateDoc(docRef,noteFirestore);//update note

        //actualizar le panel lateral

        dispatch(refreshNote(note.id, note));

        Swal.fire('Guardado Excitosamente', note.titulo, 'success');
    }
}    

//ACCION ACTUALIZAR PANEL LATERAL

export const refreshNote=(id, note)=>({
    type: types.notesUpdate,
    payload:{
        id, 
        note: {
            id,
            ...note
        }
    }
})

// accion subir imagen

export const startFileUp = (file)=>{
    return async (dispatch, getState)=>{

        const { active: activeNote } = getState().notes; // va ser igual a la nota activa

        Swal.fire({
            title: 'Cargando...',
            text: 'Espere por favor',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen:()=>{
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url= fileUrl; //actualizamos el url 
        dispatch(SaveNote(activeNote));//ejecutamos el disparch y pasamos la nota activa 

        Swal.close();


    }

}
//eliminar nota
export const starDelete= (id)=>{
    return async (dispatch, getState)=>{
        const {uid} = getState().auth;
        
        const noteRef = doc(db,`${uid}/journal/notes/${id}`);
        await deleteDoc(noteRef);
        dispatch( deleteNote(id));
        
    }
}


export const deleteNote = (id)=>({

    type: types.notesDelete,
    payload: id
});


//Limpiar logout

export const noteLogout = ()=>({
    type: types.notesLogoutCleaning
});