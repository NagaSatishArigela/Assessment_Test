import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import './ExcelViewer.css'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ExcelViewer({ sheet }) {

    const [tableData, setTableData] = useState([]);

    const classes = useStyles()

    const [state, dispatch] = useStateValue();

    console.log(state);

    useEffect(() => {
        resetRows();
    }, [state])

    const resetRows = () => {
        const data = sheet.map((row, rindex) => {
            return row?.filter((cell, cindex) => state?.selectedColumn.includes(cindex + ''));
        });
        setTableData(data);
    }

    return (
        <div id="main" onDrop={(e) => {
                console.log('Drop', e);                
                e.stopPropagation();

        }} onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}>

            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                tableData[0]?.map((heading, index) => <TableCell key={index}>{heading}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData?.map((row, index) => index ? <TableRow key={index}>
                                {
                                    row?.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)
                                }
                            </TableRow> : <></>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default ExcelViewer
