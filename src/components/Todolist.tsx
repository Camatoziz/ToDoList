import React, {useState} from 'react';
import {FilterType, TasksType} from '../App';
import {Button} from './Button';
import {Input} from './Input';
import {useAutoAnimate} from '@formkit/auto-animate/react';

type TodolistType = {
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    filter: FilterType
    addNewTask: (inputValue: string) => void
}


export const Todolist: React.FC<TodolistType> = (props: TodolistType) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const mappedTasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return <li key={t.id}>
            <input type={'checkbox'} checked={t.isDone}/>
            <span>{t.task}</span>
            <Button callBack={removeTask} name={'x'}/>
        </li>
    })
    const changeFilter = (filter: FilterType) => props.changeFilter(filter)
    const [inputValue, setInputValue] = useState<string>('')
    const addTask = () => {
        props.addNewTask(inputValue)
        setInputValue('')
    }

    return (
        <div>
            <div>
                <Input onKeyDownCallback={addTask} inputValue={inputValue} callbackInput={setInputValue}/>
                <Button name={'+'} callBack={addTask}/>
            </div>
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

