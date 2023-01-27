import { TextField } from '@mui/material';
import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

type InputPropsType = {
    callbackInput: (inputValue: string) => void
    value: string
    onEnterInputHandler: (e: KeyboardEvent<HTMLInputElement>)=>void
        error: boolean
}

const Input: FC<InputPropsType> = (props) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        props.callbackInput(e.currentTarget.value)
    }
    return (
        <TextField value={props.value}
                   onChange={onChangeInputHandler}
                   onKeyDown={props.onEnterInputHandler}
                   variant={'outlined'}
                   size={'small'}
                   label={'Enter title'}
                   error={props.error}
                   helperText={props.error&&"Title is required"}
        />
    );
};

export default Input;