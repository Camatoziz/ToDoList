import { TextField } from '@mui/material';
import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    text: string
    editedString: (text: string)=>void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [title, setTitle] = useState(props.text)
    const [editMode, setEditMode] = useState<boolean>(false)
    const editOn =()=>{
setEditMode(true)
    }
    const editOff = () => {
        setEditMode(false)
        props.editedString(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <TextField variant={'standard'}  onChange={onChangeHandler} autoFocus={true} onBlur={editOff} value={title}/>
        :<span onDoubleClick={editOn}>{props.text}</span>
    );
};

