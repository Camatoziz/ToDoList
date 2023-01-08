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
    [key: string]: Array<TasksType>
}
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TodolistsDataType = TodoListType[]


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



    const [todoLists, setTodoLists] = useState<TodolistsDataType>([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "All"}
    ])

    const removeTodolistHandler = (tdlID: string) => {
        setTodoLists(todoLists.filter(tl=>tdlID!==tl.id))
        delete tasks[tdlID]
    }


    const removeTask = (id: string, tdlID: string) => setTasks({...tasks, [tdlID]: tasks[tdlID].filter(t => id !== t.id)})
    const addNewTask = (inputValue: string, tdlID: string) => {
        const newTask = {id: v1(), task: inputValue, isDone: false}
        setTasks({...tasks, [tdlID]: [newTask, ...tasks[tdlID]]})
    }
    const changeFilter = (filter: FilterType, tdlID: string) => setTodoLists(todoLists.map(tl => tl.id === tdlID ? {...tl, filter: filter} : tl))
    const changeIsDone = (checked: boolean, id: string, tdlID: string) => {
        setTasks({...tasks, [tdlID]: tasks[tdlID].map(t=>t.id===id?{...t, isDone: checked}: t)})
    }


    return (
        <div className="App">
            {todoLists.map(tl => {

                const changeFilterRender = (filter: FilterType, tdlID: string) => {
                    return (
                    filter === "Completed" ?  tasks[tdlID].filter(t => t.isDone) :
                        filter === "Active" ?  tasks[tdlID].filter(t => !t.isDone) :
                            tasks[tdlID])
                }
                let filteredTasks = changeFilterRender(tl.filter, tl.id)
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}

                    removeTodolistHandler={removeTodolistHandler}

                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    addNewTask={addNewTask}
                    changeIsDone={changeIsDone}
                />
            })}

        </div>
    );
}

export default App;
