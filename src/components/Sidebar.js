import { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import RefreshIcon from '@material-ui/icons/Refresh';
import './Sidebar.css'
import { IconButton } from '@material-ui/core';


function Sidebar({ columns }) {

    const [state, dispatch] = useStateValue();

    const checkExists = (cIndex) => {
        if(state === undefined)
            return true;
        if (state.selectedColumn.includes(cIndex+'')) {
            return false;
        } else {
            return true;
        }
    }

    const columnClickHandler = (e) => {
        const isDraggable = e.target.getAttribute('draggable');
        if(isDraggable === true || isDraggable === 'true'){

        } else{
            dispatch({
                type: 'REMOVE_COLUMN',
                payload: e.target.getAttribute('data-id')
            })
        }
    };


    const resetColumns = () => {
        dispatch({
            type: 'RESET_COLUMNS'
        })
    };

    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <h5>COLUMNS</h5>
                <IconButton onClick={resetColumns}>
                <RefreshIcon /> <small>RESET</small>
                </IconButton>
            </div>
            <div className="data-columns">
                {
                    columns.map((columnName, columnIndex) =>
                        (<h6 className={checkExists(columnIndex) ? 'draggable' : ''} draggable={checkExists(columnIndex)} onDragEnd={(e) => {

                            console.log(e);

                            dispatch({
                                type: 'ADD_COLUMN',
                                payload: state === undefined ? [e.target.getAttribute('data-id')] : [...state.selectedColumn, e.target.getAttribute('data-id')]
                            });

                            e.stopPropagation();
                            e.preventDefault();
                        }} data-id={columnIndex} key={columnIndex} onClick={columnClickHandler}  >{columnName}</h6>)
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar
