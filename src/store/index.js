// import { applyMiddleware, createStore } from 'redux'
// import { rootReducer } from './reducers'

// const store = createStore(rootReducer);

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice"
const store = configureStore({
    reducer: {
        auth: authSlice
    },
});

export default store;