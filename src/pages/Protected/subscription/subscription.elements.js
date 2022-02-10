import { makeStyles } from "@material-ui/core";

export const Styles = makeStyles(theme => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardContent: {
        paddingTop: '40px',
        paddingBottom: '40px'
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
}))