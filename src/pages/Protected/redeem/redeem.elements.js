import { makeStyles } from "@material-ui/core";
import { green } from '@material-ui/core/colors';

export const Styles = makeStyles(theme => ({
    header: {
        marginBottom: '30px',
    },
    paperContent: {
        padding: '20px'
    },
    imageContainer: {
        display: 'flex',
        padding: '15px',
    },
    button: {
        color: theme.palette.common.white,
        backgroundColor: green[400],
        '&:hover': {
            backgroundColor: green[500],
        },
    },
    productPicture: {
        margin: 'auto',
        border: '2px solid #bdbdbd',
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}))