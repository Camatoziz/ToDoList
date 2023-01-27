import React, {FC} from 'react';
import {Button} from '@mui/material'
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
            <Button variant={props.filter==='All'?"contained":"outlined"} onClick={()=>filterButtonHandler('All')}>{'All'} </Button>
            <Button variant={props.filter==='Completed'?"contained":"outlined"} onClick={()=>filterButtonHandler("Completed")}>{'Completed'}</Button>
            <Button variant={props.filter==='Active'?"contained":"outlined"} onClick={()=>filterButtonHandler('Active')}>{'Active'}</Button>
         {/*   <Button filter={props.filter} title={'All'} />
            <Button filter={props.filter} title={'Completed'} />
            <Button filter={props.filter} title={'Active'} callback={() => filterButtonHandler("Active")}/>*/}
        </div>
    );
};

export default FilteringButtons;