import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])
    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    let taskFilter = (value: string) => {
        console.log(value)

    }
    let durshlag = tasks.filter((el) => el.isDone)
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={durshlag}
                removeTask={removeTask}
                taskFilter={taskFilter}/>
        </div>
    );
}

export default App;
