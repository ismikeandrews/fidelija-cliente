import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
    },
    paginationIcons: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    paperHeader: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    noHistory:{
        textAlign: 'center',
        margin: '70px'
    },
    noHistoryMg: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));