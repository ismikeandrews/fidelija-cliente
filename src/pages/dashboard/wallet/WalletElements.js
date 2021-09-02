import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    spacing: {
        marginBottom: '15px'
    },
    cardIcon: {
        width: '50px'
    },
    arccord: {
        width: '100%',
    },
    addButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '25px',
    },
    notRegistered: {
        textAlign: 'center',
        padding: '90px',
    },
    infoText: {
        marginBottom: '20px'
    },
    content: {
        paddingTop: '30px',
        paddingBottom: '50px'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));