import React, {FC, KeyboardEvent, useState} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Input from "./Input";
import s from './AddItemForm.module.css'
import { Button, IconButton } from '@mui/material';

type AddItemtFormProps = {
    addItem: (text: string)=> void
}

const AddItemForm: FC<AddItemtFormProps> = (props) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeInputValue = (value: string)=>{
        setError(false)
        setInputValue(value)
    }
    const onEnterInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key==="Enter"&&addItemHandler()
    }
    const addItemHandler = () =>{
        inputValue===""?setError(true):
            props.addItem(inputValue.trim())
        setInputValue('')
    }
/*const errorClass = error===null?'':s.errorInput*/
    return (
        <div>
            
            <Input                
                error={error}
                onEnterInputHandler={onEnterInputHandler} 
                value={inputValue} 
                callbackInput={changeInputValue}/>
           <IconButton>

           </IconButton>
            <Button size={'small'} variant={"contained"} onClick={addItemHandler} endIcon={<AddCircleOutlineIcon/>}>
                {"Add"}
            </Button>
            {error&&<div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

export default AddItemForm;
