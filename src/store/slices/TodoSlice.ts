import { createSlice } from "@reduxjs/toolkit";

interface Todo {
    user : string,
    _id : string,
    content : string
}

interface TodoState {
    todos : Todo[],
    updateTodo : Todo | null
}

const initialState : TodoState = {
    todos : [],
    updateTodo : null,
}

export const TodoSlice = createSlice({
    name : 'TodoSlice',
    initialState,
    reducers : {
        addTodo : (state , action) => {
            state.todos.push(action.payload)
        },
        updateTodos : (state , action) => {
            state.todos = action.payload
        },
        removeTodos : (state) => {
            state.todos = []
        },
        deleteTodo : (state , action) => {
            state.todos = state.todos.filter(el => el._id !== action.payload)
        },
        addUpdateTodo : (state, action) => {
            state.updateTodo = action.payload
        },
        removeUpdateTodo : (state)=> {
            state.updateTodo = null
        }
    }
})

export const {addTodo , updateTodos , removeTodos , deleteTodo , addUpdateTodo , removeUpdateTodo} = TodoSlice.actions

export default TodoSlice.reducer