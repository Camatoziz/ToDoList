import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import Todolist from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type DataTasksType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    task: string
    isDone: boolean
}

export type FilterType = "All" | "Completed" | "Active"

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID_1, title: "What to learn", filter: 'All'},
        {id: todolistID_2, title: "What to buy", filter: 'All'}
    ])
    const [tasks, setTasks] = useState<DataTasksType>({
        [todolistID_1]: [
            {id: v1(), task: "HTML", isDone: true},
            {id: v1(), task: "CSS", isDone: true},
            {id: v1(), task: "JS", isDone: true},
            {id: v1(), task: "React", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), task: "Milk", isDone: false},
            {id: v1(), task: "Meat", isDone: true},
            {id: v1(), task: "Water", isDone: false},
            {id: v1(), task: "Salt", isDone: true}
        ]
    })

    const removeTodolist = (tdlID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== tdlID))
        delete tasks[tdlID]
    }
    const addTodolist = (text: string) => {
        const todolistID_3 = v1()
        const newTodolist: TodolistType = {id: todolistID_3, title: text, filter: "All"}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistID_3]: []})
    }

    const editedStringTodolist = (text: string, tdlID: string) =>{
        setTodolists(todolists.map(tl => tl.id === tdlID ? {...tl, title: text} : tl))
    }


    const removeTask = (id: string, tdlID: string) => setTasks({
        ...tasks,
        [tdlID]: tasks[tdlID].filter(t => id !== t.id)
    })
    const addTask = (text: string, tdlID: string) => {
        const newTask = {id: v1(), task: text, isDone: false}
        setTasks({...tasks, [tdlID]: [newTask, ...tasks[tdlID]]})
    }
    const changeFilter = (filter: FilterType, tdlID: string) => {
        setTodolists(todolists.map(tl => tl.id === tdlID ? {...tl, filter: filter} : tl))
    }
    const changeStatus = (status: boolean, id: string, tdlID: string) => {
        setTasks({...tasks, [tdlID]: tasks[tdlID].map(t => id === t.id ? {...t, isDone: status} : t)})
    }
    const editStringTask = (text: string, id: string, tdlID: string)=> {
        setTasks({...tasks, [tdlID]: tasks[tdlID].map(t => id === t.id ? {...t, task: text} : t)})
    }


    const mappedTodolists = todolists.map(tl => {
        const changeRenderTasksByFilter = (filter: FilterType, tdlID: string): TaskType[] => {
            return (
                filter === "Completed" ? tasks[tdlID].filter(t => t.isDone)
                    : filter === "Active" ? tasks[tdlID].filter(t => !t.isDone)
                        : tasks[tdlID]
            )
        }
        const filteredTasks: TaskType[] = changeRenderTasksByFilter(tl.filter, tl.id)
        return (
            <Grid item>
                <Paper elevation={3}
                       sx={{p: "20px"}}>
            <Todolist
                key={tl.id}
                tdlID={tl.id}
                title={tl.title}
                dataTasks={filteredTasks}
                filter={tl.filter}

                removeTodolist={removeTodolist}

                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                editedStringTask={editStringTask}
            editedStringTodolist={editedStringTodolist}
            />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    sx={{p: "10px 0px"}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container
                      spacing={2}>
                    {mappedTodolists}
                </Grid>
            </Container>


        </div>
    );
}

export default App;
