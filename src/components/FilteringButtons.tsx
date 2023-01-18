import React, {FC} from 'react';
import Button from "./Button";
import {FilterType} from "../App";

type FilterButtonsPropsType = {
    changeFilter: (filter: FilterType)=>void
    filter: FilterType
}

const FilteringButtons:FC<FilterButtonsPropsType> = (props) => {
    const filterButtonHandler = (filter: FilterType) => {
    props.changeFilter(filter)
    }
    return (
        <div>
            <Button filter={props.filter} title={'All'} callback={() => filterButtonHandler("All")}/>
            <Button filter={props.filter} title={'Completed'} callback={() => filterButtonHandler("Completed")}/>
            <Button filter={props.filter} title={'Active'} callback={() => filterButtonHandler("Active")}/>
        </div>
    );
};

export default FilteringButtons;