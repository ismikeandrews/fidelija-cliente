import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },
    topMenu: {
        margin: '25px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paginationIcons: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    noProducts:{
        textAlign: 'center',
        margin: '70px'
    },
    noProductsMg: {
        marginTop: '20px',
        marginBottom: '20px'
    }
 }));