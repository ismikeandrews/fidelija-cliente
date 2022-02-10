import { makeStyles } from '@material-ui/core';

export const Styles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px'
    },
    paginationIcons: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    noContent: {
        textAlign: 'center',
        margin: '70px'
    },
    noContentMsg: {
        marginTop: '20px',
        marginBottom: '20px'
    }
}))