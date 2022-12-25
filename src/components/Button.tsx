import React from 'react';
import {FilterType} from '../App';
import s from "./Button.module.css"

type ButtonType = {
    name: string
    callBack: ()=>void
    filter?: FilterType
}

export const Button: React.FC<ButtonType> = ({name, callBack, filter}) => {
    const onClickHandler = () => {
        callBack()
    }
    return (
        <button className={filter===name?s.active:""} onClick={onClickHandler}>{name}</button>
    );
};

