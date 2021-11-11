import React from 'react'
import {
    Typography,
    Select,
    MenuItem,
    makeStyles
} from '@material-ui/core'
import { Pagination as MuiPagination } from '@material-ui/lab'

const Styles = makeStyles(theme => ({
    pagination: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px"
    },
    paginationItem: {
        marginRight: '20px'
    }
}))

const Pagination = (props) => {
    const classes = Styles();

    return (
        <div className={classes.pagination}>
            <Typography variant="subtitle2" className={classes.paginationItem}>Itens por página:</Typography>
            <Select className={classes.paginationItem} value={props.rows} onChange={props.changeRows} variant="standard">
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
            <MuiPagination 
            count={props.count} 
            color="primary" 
            shape="rounded" 
            showFirstButton 
            showLastButton
            onChange={props.changePage}/>
        </div>
    )
}

export default Pagination;
