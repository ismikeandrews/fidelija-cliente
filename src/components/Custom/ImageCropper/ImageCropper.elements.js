import { makeStyles } from "@material-ui/core";

export const Styles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    cropArea: {
        width: "500px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    slider: {
        padding: "32px"
    },
    rotationButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
}))