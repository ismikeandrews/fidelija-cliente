import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const Styles = makeStyles(theme => ({
    header: {
        marginBottom: '30px',
    },
    paperContent: {
        padding: "10px"
    },
    button: {
        backgroundColor: green[500],
        color: "#fff",
    }
}))