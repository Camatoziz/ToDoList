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
type DataTasksType = {
    [key: string]: TasksType[]
}


function App() {
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()


    const [tasks, setTasks] = useState<DataTasksType>({
        [todoListId_1]: [
            {id: v1(), task: 'HTML', isDone: true},
            {id: v1(), task: 'CSS', isDone: true},
            {id: v1(), task: 'JS', isDone: true},
            {id: v1(), task: 'React', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), task: 'Meat', isDone: false},
            {id: v1(), task: 'Milk', isDone: false},
            {id: v1(), task: 'Water', isDone: false},
            {id: v1(), task: 'Juice', isDone: false}
        ]
    })
 /*   const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), task: 'HTML', isDone: true},
        {id: v1(), task: 'CSS', isDone: true},
        {id: v1(), task: 'JS', isDone: true},
        {id: v1(), task: 'React', isDone: false},
    ])*/
    const [todoLists, setTodoList] = useState([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "All"}
    ])


    const removeTask = (id: string, tdlID: string) => setTasks({...tasks, tasks[tdlID].filter})
    const addNewTask = (inputValue: string, tdlID: string) => {
        const newTask = {id: v1(), task: inputValue, isDone: false}
        setTasks([newTask, ...tasks])
    }
    /*const [filterValue, setFilterValue] = useState<FilterType>('All')*/
    const changeFilter = (filter: FilterType) => {
        setFilterValue(filter)
    }

    const changeIsDone = (checked: boolean, id: string, tdlID: string) => {
        setTasks(tasks.map(t=>t.id===id?{...t, isDone: checked}:t))
    }

 /*   let filteredTasks: any = []
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filterValue === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filterValue === 'All') {
        filteredTasks = [...tasks]
    }*/

    const changeFilter = (filter: FilterType, tdlID: string) => {
        let filteredTasks = []
        filter==="Completed"?filteredTasks = tasks.filter(t => t.isDone):
            filter==="Active"?filteredTasks = tasks.filter(t => !t.isDone):
                filteredTasks = [...tasks]
    }


    return (
        <div className="App">
            {todoLists.map(tl=>{
                return <Todolist
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    filter={filterValue}
                    addNewTask={addNewTask}
                    changeIsDone={changeIsDone}
                />
            })}

        </div>
    );
}

export default App;
