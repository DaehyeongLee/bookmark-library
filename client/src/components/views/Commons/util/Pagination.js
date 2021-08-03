import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Material_Pagination from '@material-ui/lab/Pagination';

function Pagination(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    
    const classes = useStyles();


    return (
        <React.Fragment>
            <div className={classes.root}>
                < Material_Pagination count={props.totalCount} showFirstButton showLastButton/>
            </div>
        </React.Fragment>

    )
}

export default Pagination
