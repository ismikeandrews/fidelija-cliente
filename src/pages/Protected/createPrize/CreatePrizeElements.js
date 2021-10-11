import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px'
    },
    contentSpacing: {
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    formControl: {
     marginBottom: '20px',
     minWidth: 120,
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
    newCategory: {
     display: 'flex',
     flexDirection: 'column',
     marginBottom: '20px',
     gap: '10px'
    },
    paperImg: {
        marginBottom: '25px',
    },
    previewFormat: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    submitButton: {
        marginBottom: '20px'
    },
    backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   },
 }));