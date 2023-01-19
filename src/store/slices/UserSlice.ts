import { createSlice } from '@reduxjs/toolkit'

interface IUserState {
    user : any,
    loading : boolean,
    isAuthenticated : boolean
}

const initialState : IUserState = {
    user : {},
    loading : false,
    isAuthenticated : false
}

export const userSlice = createSlice({
    name : 'userSlice',
    initialState,
    reducers : {
        loadingTrue : (state)=> {
            state.loading = true
        },
        loadingFalse : (state)=> {
            state.loading = false
        },
        addUser : (state ,action)=> {
            state.loading = false,
            state.user = action.payload,
            state.isAuthenticated = true
        },
        removeUser : (state) => {
            state.loading = false,
            state.user = {},
            state.isAuthenticated = false
        }
    }
})

export const {loadingFalse , loadingTrue , addUser , removeUser} = userSlice.actions

export default userSlice.reducer