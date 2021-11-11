import { makeStyles } from '@material-ui/core';

export const Styles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        marginBottom: "30px"
    },
    imgText: {
        display: "flex",
        alignItems: "center",
    },
    noEmployee:{
        textAlign: 'center',
        margin: '70px'
    },
    noEmployeeMsg: {
        marginTop: '20px',
        marginBottom: '20px'
    },
}))