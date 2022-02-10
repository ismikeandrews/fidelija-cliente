import { makeStyles } from '@material-ui/core/styles';

export const Styles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topMenu: {
        margin: '25px',
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