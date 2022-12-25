import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputType = {
    callbackInput: (value: string) => void
    inputValue: string
    onKeyDownCallback: () => void
}

export const Input: React.FC<InputType> = ({callbackInput, inputValue, onKeyDownCallback}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => callbackInput(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onKeyDownCallback()
    }

    return (
        <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
    );
};

