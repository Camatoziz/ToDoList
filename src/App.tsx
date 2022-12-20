import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TypeFilter = 'ALL' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const addTask = (v: string) => {
        let newTask = {id: v1(), title: v, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    let [filteredTasks, setFilteredTasks] = useState<TypeFilter>('ALL')

    let taskFilter = (value: TypeFilter) => {
        setFilteredTasks(value)

    }

    if (filteredTasks === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }
    if (filteredTasks === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                taskFilter={taskFilter}
                callback={addTask}
            />
        </div>
    );
}

export default App;
