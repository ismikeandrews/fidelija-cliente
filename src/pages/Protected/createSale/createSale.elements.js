import { makeStyles } from "@material-ui/core";

export const Styles = makeStyles(theme => ({
    header: {
        marginBottom: '30px',
    },
    contentSpacing: {
        padding: '20px'
    },
    formControl: {
        marginBottom: '20px',
        minWidth: 120,
    },
    paperProduct: {
        marginBottom: '2rem'
    },
    addProdCard: {
        cursor: 'pointer',
        height: '240px',
        width: '240px',
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    addButton: {
        margin: 'auto'
    },
    addText: {
        textAlign: 'center',
        fontSize: "11px",
    },
    prodCard:{
        height: '240px',
        width: '240px',
    }
}))