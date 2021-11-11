import { makeStyles } from "@material-ui/core";

export const Styles = makeStyles((theme) => ({

    spacing: {
        marginTop: "120px",
        marginBottom: "120px"
    },

    content: {
        padding: "20px"
    },

    form: {
        margin: '40px'
    },

    buttons: {
        marginTop: '100px'
    },
    infoTitle:{
        marginBottom: "10px"
    },
    paperFiles: {
    '&:hover': {
        backgroundColor: 'rgb(88 88 88 / 23%)',
        cursor: 'pointer',
    },
        marginBottom: '25px'
    },
    files: {
        margin: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentSpacing: {
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    previewFormat: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paperImg: {
        marginBottom: '25px',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));