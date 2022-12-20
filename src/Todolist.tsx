import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TypeFilter} from './App';
import {Button} from './components/Button';
import {useAutoAnimate} from '@formkit/auto-animate/react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    taskFilter: (value: TypeFilter) => void
    callback: (inputText: string) => void
}


export function Todolist(props: PropsType) {
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const [inputText, setInputText] = useState('')
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }
    const inputButtonHandler = () => {
        props.callback(inputText)
        setInputText('')
    }
    const inputKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputButtonHandler()
        }}
    const filterHandler = (v: TypeFilter) => {
        props.taskFilter(v)
    }
    const mappedTasks = props.tasks.map(t => {
            const removeButton = () => props.removeTask(t.id)
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                   {/* <button onClick={removeButton}>x</button>*/}
                    <Button name={'x'} callback={removeButton}/>
                </li>
            )})

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputText} onChange={changeValue} onKeyDown={inputKeyHandler}/>
                {/*<button onClick={inputButtonHandler}>+</button>*/}
                <Button name={'+'} callback={inputButtonHandler}/>
            </div>
            <ul ref={listRef}>
                {mappedTasks}
            </ul>
            <div>
                {/*<button onClick={() =>filterHandler('ALL')}>All</button>
                <button onClick={() =>filterHandler('Active')}>Active</button>
                <button onClick={() =>filterHandler('Completed')}>Completed</button>*/}
                <Button name={'All'} callback={() =>filterHandler('ALL')}/>
                <Button name={'Active'} callback={() =>filterHandler('Active')}/>
                <Button name={'Completed'} callback={() =>filterHandler('Completed')}/>
            </div>
        </div>
    )
}

