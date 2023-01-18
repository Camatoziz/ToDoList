import React, {FC, KeyboardEvent, useState} from 'react';
import Button from "./Button";
import Input from "./Input";
import s from './AddItemForm.module.css'

type AddItemtFormProps = {
    addItem: (text: string)=> void
}

const AddItemForm: FC<AddItemtFormProps> = (props) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const changeInputValue = (value: string)=>{
        setError(null)
        setInputValue(value)
    }
    const onEnterInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key==="Enter"&&addItemHandler()
    }
    const addItemHandler = () =>{
        inputValue===""?setError('Title is required'):
            props.addItem(inputValue.trim())
        setInputValue('')
    }
const errorClass = error===null?'':s.errorInput
    return (
        <div>
            <Input className={errorClass} onEnterInputHandler={onEnterInputHandler} value={inputValue} callbackInput={changeInputValue}/>
            <Button title={"+"} callback={addItemHandler}/>
            {error&&<div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

export default AddItemForm;
