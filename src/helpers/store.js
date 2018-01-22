/*
    el store de la aplicación que tiene todos los datos del estado
    se agrega el devtools para ver lo que pasa con redux
*/

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer, composeWithDevTools(
        applyMiddleware(
            ReduxPromise,
            thunkMiddleware,
            loggerMiddleware
        )
    )
);


          