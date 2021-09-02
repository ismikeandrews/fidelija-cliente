import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paginationIcons: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    header: {
        marginBottom: '30px',
    },
    topMenu: {
        margin: '25px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    noUsers:{
        textAlign: 'center',
        margin: '70px'
    },
    noUsersMg: {
        marginTop: '20px',
        marginBottom: '20px'
    }
}));