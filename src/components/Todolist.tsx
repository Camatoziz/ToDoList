import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterType, TaskType} from "../App";
import Button from "./Button";
import Input from "./Input";
import FilteringButtons from "./FilteringButtons";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistProps = {
    key: string
    tdlID: string
    title: string
    dataTasks: TaskType[]
    filter: FilterType

    removeTodolist: (tdlID: string) => void

    removeTask: (id: string, tdlID: string) => void
    addTask: (text: string, tdlID: string) => void
    changeFilter: (filter: FilterType, tdlID: string) => void
    changeStatus: (status: boolean, id: string, tdlID: string) => void
    editedStringTask: (text: string, id: string, tdlID: string)=>void
    editedStringTodolist: (text: string, tdlID: string)=>void
}

const Todolist: FC<TodolistProps> = (props) => {

    const removeTodolistHandler = () => {
        props.removeTodolist(props.tdlID)
    }

    const addTaskHandler = (inputValue: string) => {
        props.addTask(inputValue, props.tdlID)
    }
    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter, props.tdlID)
    }
    const changeStatusHandler = (status: boolean, id: string) => {
        props.changeStatus(status, id, props.tdlID)
    }


    const mappedTasks = props.dataTasks.length !== 0
        ? props.dataTasks.map(t => {
            return (
                <li key={t.id}>
                    <input type={"checkbox"} checked={t.isDone}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatusHandler(e.currentTarget.checked, t.id)}/>
                    <EditableSpan editedString={(text: string)=>props.editedStringTask(text, t.id, props.tdlID)}
                                  text={t.task}/>
                    <Button title={'x'} callback={() => props.removeTask(t.id, props.tdlID)}/>
                </li>
            )
        }) : "Tasks is empty"

    return (
        <div>
            <h3>
                <EditableSpan text={props.title}
                              editedString={(text: string)=>props.editedStringTodolist(text, props.tdlID)}/>
                <Button title={'x'} callback={removeTodolistHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {/*<div>
                <Input onEnterInputHandler={onEnterInputHandler} value={inputValue} callbackInput={changeInputValue}/>
                <Button title={"+"} callback={addTaskHandler}/>
            </div>
            {error&&<div>{error}</div>}*/}
            <div>
                <ul>
                    {mappedTasks}
                </ul>
            </div>
            <FilteringButtons filter={props.filter} changeFilter={changeFilterHandler}/>
        </div>
    );
};

export default Todolist;