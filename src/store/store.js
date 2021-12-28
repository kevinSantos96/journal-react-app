import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; //para pder usar middleware las funciones del navegador


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})	

//configuraciones para trabajar peticiones asincronas en nuestra  app
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );