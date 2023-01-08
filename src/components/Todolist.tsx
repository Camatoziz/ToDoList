
import React, {ChangeEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';
import {Button} from './Button';
import {Input} from './Input';

import s from "./Todolist.module.css"
import {useAutoAnimate} from "@formkit/auto-animate/react";

type TodolistType = {
    key: string
    id: string
    title: string
    tasks: TasksType[]

    removeTodolistHandler: (id: string)=>void

    removeTask: (id: string, tdlID: string) => void
    changeFilter: (filter: FilterType, tdlID: string) => void
    filter: FilterType
    addNewTask: (inputValue: string, tdlID: string) => void
    changeIsDone: (checked: boolean, id: string, tdlID: string) => void
}


export const Todolist: React.FC<TodolistType> = (props: TodolistType) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const checkedHandler = (checked: boolean, id: string) => {
        props.changeIsDone(checked, id, props.id)
    }

    const mappedTasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        return <li key={t.id} className={t.isDone?s.completedTask:''}>
            <input type={'checkbox'} checked={t.isDone}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => checkedHandler(e.currentTarget.checked, t.id)}/>
            <span>{t.task}</span>
            <Button callBack={removeTask} name={'x'}/>
        </li>
    })

    const onChangeInput = (value: string) => {
        setInputValue(value)
        setError(null)
    }

    const changeFilter = (filter: FilterType) => props.changeFilter(filter, props.id)

    const [inputValue, setInputValue] = useState<string>('')

    const [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addNewTask(inputValue.trim(), props.id)
            setInputValue('')
        } else {
            setError('The title is required')
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolistHandler(props.id)
    }

    return (
        <div>
            <div>
                <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
                </h3>
                <Input onKeyDownCallback={addTask}
                       inputValue={inputValue}
                       callbackInput={onChangeInput}
                       error={error}
                />
                <Button name={'+'} callBack={addTask}/>
            </div>
            {error && <div className={error?s.errorMessage:''}>{error}</div>}
            <div>
                <ul ref={listRef}>
                    {mappedTasks}
                </ul>
            </div>
            <div>
                <Button name={'All'} callBack={() => changeFilter('All')} filter={props.filter}/>
                <Button name={'Completed'} callBack={() => changeFilter('Completed')} filter={props.filter}/>
                <Button name={'Active'} callBack={() => changeFilter('Active')} filter={props.filter}/>
            </div>
        </div>
    );
};

