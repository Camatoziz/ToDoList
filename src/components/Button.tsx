import React, {FC} from 'react';
import {FilterType} from "../App";
import s from './FilteringButtons.module.css'

type ButtonPropsType = {
    title: string
    callback: ()=>void
    filter?: FilterType
}

const Button: FC<ButtonPropsType> = (props) => {
    const onClickButtonHandler = () => props.callback()
    return (
           <button className={props.filter===props.title?s.active:""} onClick={onClickButtonHandler}>{props.title}</button>

    );
};

export default Button;