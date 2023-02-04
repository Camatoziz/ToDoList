import {v1} from "uuid"
import {FilterType, TodolistType} from "../App"


export type removeTodolistActionType = {
    type: "REMOVE-TODOLIST"
    tdlID: string
}

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type changeTodolistActionType = {
    type: "CHANGE-TODOLIST"
    tdlID: string
    title: string
}

export type changeFilterActionType = {
    type: 'CHANGE-FILTER'
    tdlID: string
    filter: FilterType
}

export type ActionsType = removeTodolistActionType
    | addTodolistActionType
    | changeTodolistActionType
    | changeFilterActionType

export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const CHANGE_TODOLIST = "CHANGE-TODOLIST"
export const CHANGE_FILTER = "CHANGE-FILTER"


export const todolistsReducer = (state: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.tdlID)
        case ADD_TODOLIST:
            const todolistID_3 = v1()
            const newTodolist = {id: todolistID_3, title: action.title, filter: "All"}
            return [...state, newTodolist]
        case CHANGE_TODOLIST:
            return state.map(tl => tl.id === action.tdlID ? {...tl, title: action.title} : tl)
        case CHANGE_FILTER:
            return state.map(tl => tl.id === action.tdlID ? {...tl, filter: action.filter} : tl)
        default:
            throw Error("I don't understand this type")
    }
}

export const removeTodolistAC = (tdlID: string): removeTodolistActionType => ({type: REMOVE_TODOLIST, tdlID: tdlID})
export const addTodolistAC = (title: string): addTodolistActionType => ({type: ADD_TODOLIST, title: title})
export const changeTodolistAC = (tdlID: string, title: string): changeTodolistActionType => ({type: CHANGE_TODOLIST, tdlID: tdlID,  title: title})
export const changeFilterAC = (tdlID: string, filter: FilterType): changeFilterActionType => ({type: CHANGE_FILTER, tdlID: tdlID, filter: filter})

