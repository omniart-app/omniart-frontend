// import { combineReducers } from "redux";
// import global from "./global";

// export const rootReducer = combineReducers({
//     global: global
// })

// const reducers = (state, action) => rootReducer(state, action);

// export default reducers;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// export const fetchAuthUser = createAsyncThunk('fetchAuthUser', async (wallet_address) => {
//   const response = await fetch("https://omniart.app/api/user/"+wallet_address);
//   return response.json();
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isLoading: true,
//     isError: false,
//     logedInUser: null,
//     profiles: null
//   },
//   reducers: {
//     setAuth: (state, action) => {
//       state.logedInUser = action.payload
//     },
//     setProfiles: (state, action) => {
//       state.profiles = action.payload
//     },
//     removeAuth: (state) => {
//       state.logedInUser = null
//     },
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(fetchAuthUser.pending, (state, action) => {
//     //   state.isLoading = true;
//     // });
//     builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//     //   state.logedInUser = action.payload.user
//     //   state.profiles = action.payload.profiles
//     });
//     builder.addCase(fetchAuthUser.rejected, (state, action) => {
//       state.isError = true;
//       console.log("Error", action.payload)
//     });
//   }
// })

// export const { setAuth, removeAuth, setProfiles } = authSlice.actions
// export default authSlice.reducer