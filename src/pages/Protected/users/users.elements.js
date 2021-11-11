import { makeStyles } from '@material-ui/core/styles';

export const Styles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
    },
    topMenu: {
        margin: '25px',
    },
    noUsers:{
        textAlign: 'center',
        margin: '70px'
    },
    noUsersMg: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    imgText: {
        display: "flex",
        alignItems: "center",
    },
    pagination: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px"
    },
    paginationItem: {
        marginRight: '20px'
    }
}));