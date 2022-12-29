import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';


export type TasksType = {
    id: string
    task: string
    isDone: boolean
}

export type FilterType = 'All' | 'Completed' | 'Active'


function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), task: 'HTML', isDone: true},
        {id: v1(), task: 'CSS', isDone: true},
        {id: v1(), task: 'JS', isDone: true},
        {id: v1(), task: 'React', isDone: false},
    ])
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const addNewTask = (inputValue: string) => {
        const newTask = {id: v1(), task: inputValue, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const [filterValue, setFilterValue] = useState<FilterType>('All')
    const changeFilter = (filter: FilterType) => {
        setFilterValue(filter)
    }

    const changeIsDone = (checked: boolean, id: string) => {
        setTasks(tasks.map(t=>t.id===id?{...t, isDone: checked}:t))
    }

    let filteredTasks: any = []
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filterValue === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filterValue === 'All') {
        filteredTasks = [...tasks]
    }


    return (
        <div className="App">
            <Todolist
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                filter={filterValue}
                addNewTask={addNewTask}
                changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
