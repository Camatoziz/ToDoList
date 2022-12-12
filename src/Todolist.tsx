import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number)=> void
    taskFilter: (value: string)=>void

export function Todolist(props: PropsType) {
    return (
        <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(t=>{
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>props.removeTask(t.id)}>x</button>
                    </li>
                )}
            )}
        </ul>
        <div>
            <button onClick={()=>{props.taskFilter("all")}}>All</button>
            <button onClick={()=>{props.taskFilter("active")}}>Active</button>
            <button onClick={()=>{props.taskFilter("completed")}}>Completed</button>
        </div>
    </div>
    )
}
