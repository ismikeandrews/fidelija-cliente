import { makeStyles } from '@material-ui/core';

export const Styles = makeStyles(theme => ({
    paper: {
        padding: '25px',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
      margin: theme.spacing(4),
      width: '180px'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    links: {
        color: "#757575",
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}))