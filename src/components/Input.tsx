import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

type InputPropsType = {
    callbackInput: (inputValue: string) => void
    value: string
    onEnterInputHandler: (e: KeyboardEvent<HTMLInputElement>)=>void
    className: string
}

const Input: FC<InputPropsType> = (props) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        props.callbackInput(e.currentTarget.value)
    }
    return (
        <input className={props.className} onKeyDown={props.onEnterInputHandler} value={props.value} onChange={onChangeInputHandler}/>
    );
};

export default Input;