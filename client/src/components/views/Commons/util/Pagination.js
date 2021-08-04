import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Material_Pagination from '@material-ui/lab/Pagination';

//Need Parameter
//1. props.totalCount
//2. props.setcurrentItems
//3. props.items //All items list
function Pagination(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    
    const classes = useStyles();

    const onChangeHandler = (event, number) => {

        props.setcurrentItems(props.items.slice(10 * (number - 1), 10 * number))
    }


    return (
        <React.Fragment>
            <div className={classes.root}>
                < Material_Pagination count={props.totalCount} onChange={onChangeHandler} showFirstButton showLastButton/>
            </div>
        </React.Fragment>

    )
}

export default Pagination
