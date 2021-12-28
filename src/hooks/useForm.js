import { useState } from "react"


//recibe un objeto
export const useForm = (initialState={}) => {
 const [values, setvalues] = useState(initialState);

 const reset =(NewFormState=initialState)=>{
    setvalues( NewFormState );
}

 const handleInputChange = ({target})=>{ //handleInputChange nos sirve para poderlo leer rapidamente
    // e.preventDefault();
    setvalues({
        ...values,
           [target.name]: target.value
    });
}


return[values, handleInputChange, reset ]
}
