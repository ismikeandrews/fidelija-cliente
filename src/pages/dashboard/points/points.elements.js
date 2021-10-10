import { makeStyles } from "@material-ui/core";

export const styles = makeStyles(theme => ({
    header: {
        marginBottom: "30px"
    },
    paperContent: {
        padding: "10px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))