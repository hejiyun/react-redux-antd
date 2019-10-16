import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import * as pro from './Collecte/reducer'

let store =  createStore (
    combineReducers({...pro}),
    applyMiddleware(thunk)
)
export default store;
