import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchAuthUser = createAsyncThunk('fetchAuthUser', async (input) => {
    const data = {
        address: input.address,
        ref_by: input.ref_by
    };

    const authToken = localStorage.getItem('auth_token');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch("https://api.omniart.app/api/user", options)
    return response.json();
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: true,
        logedInUser: null,
    },
    reducers: {
        setAuth: (state, action) => {
            state.logedInUser = action.payload
        },
        removeAuth: (state) => {
            state.logedInUser = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.logedInUser = action.payload.user
        });
        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            state.isError = true;
            console.log("Error", action.payload)
        });
    }
})

export const { setAuth, removeAuth, setProfiles } = authSlice.actions
export default authSlice.reducer