import { types } from "../types/types"


const initialSate ={
    loading: false,
    msgError: null
}


export const uiReducer = (state = initialSate, action) =>{

    switch (action.type) {
        case types.uiSetError:
            return{
                ...state,//mantenemos el state
                msgError: action.payload//modificamos el payload
            }
            
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            } 

        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}