import { combineReducers,createStore } from 'redux';
import reducerProfile from './reducers/profileReducer';

const rootReducer = combineReducers({
    reducerProfile
})
const store = createStore(rootReducer)

export default store;