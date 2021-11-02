import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

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
    button: {
        backgroundColor: green[500],
        color: "#fff",
    }
}))