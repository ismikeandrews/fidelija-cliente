import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
    tab: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
    spacing: {
        padding: "35px"
    },
    usrProfile: {
        border: '2px solid #bdbdbd',
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    paperContent: {
        padding: '20px',
    },
    paperHeader: {
        padding: "15px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paperFooter: {
        padding: "15px",
        display: "flex",
        justifyContent: 'flex-end'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))