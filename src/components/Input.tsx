import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Input.module.css'

type InputType = {
    callbackInput: (value: string) => void
    inputValue: string
    onKeyDownCallback: () => void
    error: string|null
}

export const Input: React.FC<InputType> = ({callbackInput, inputValue, onKeyDownCallback, ...props}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => callbackInput(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onKeyDownCallback()
    }

    return (
        <input className={props.error?s.error:''} value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
    );
};

