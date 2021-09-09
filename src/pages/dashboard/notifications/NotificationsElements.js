import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))