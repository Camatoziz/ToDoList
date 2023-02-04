import {useState} from "react";
import { v1 } from "uuid";
import {TodolistType} from "../App"
import {ActionsType, addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'
const todolistID_1 = v1()
const todolistID_2 = v1()

test ('remove todolist', ()=>{



    const startState:TodolistType[]=[
        {id: todolistID_1, title: "What to learn", filter: 'All'},
        {id: todolistID_2, title: "What to buy", filter: 'All'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID_1) )


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID_2)
})

test ('add todolist', ()=>{
    const startState:TodolistType[]=[
        {id: todolistID_1, title: "What to learn", filter: 'All'},
        {id: todolistID_2, title: "What to buy", filter: 'All'}
    ]
    const endState = todolistsReducer(startState, addTodolistAC("What i need"))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What i need')

})

test ('change todolist name', ()=>{
    const startState:TodolistType[]=[
        {id: todolistID_1, title: "What to learn", filter: 'All'},
        {id: todolistID_2, title: "What to buy", filter: 'All'}
    ]
    const newTodolistTitle = "New todolist"

    const endState = todolistsReducer(startState, changeTodolistAC(todolistID_2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})

test ('CHANGE-FILTER', ()=>{
    const startState:TodolistType[]=[
        {id: todolistID_1, title: "What to learn", filter: 'All'},
        {id: todolistID_2, title: "What to buy", filter: 'All'}
    ]
    const newFilter = "Completed"

    const endState = todolistsReducer(startState, changeFilterAC(todolistID_2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})