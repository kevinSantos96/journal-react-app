import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase/firebase-config"


//cargar nota
export const loadNotes = async (uid)=>{

    const notesSnap = await getDocs(query(collection(db,`${uid}/journal/notes`)));
    const notes = [];

    notesSnap.forEach(snapHijo=>{
        // console.log(snapHijo.data())
        notes.push({ //añadimos un nuevo elememnto
            id: snapHijo.id,
            ...snapHijo.data()//el body 
        })
    });

    // console.log(notes)
    
    return notes;
}