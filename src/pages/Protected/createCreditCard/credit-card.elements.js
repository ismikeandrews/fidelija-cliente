import { makeStyles } from '@material-ui/core/styles';

export const Styles = makeStyles((theme) => ({
    header: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentSpacing: {
        margin: '25px'
    },
    creditCard: {
        backgroundColor: '#163a79',
        borderRadius: '15px',
        position: 'absolute',
        width: '490px',
        height: '288px',
        willChange: 'transform, opacity'
    },
    ccFlag: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    ccContainer: {
        padding: '30px'
    },
    ccNumber: {
        color: "#fff",
        fontSize: "30px"
    },
    titles: {
        color: "#fff"
    },
    value: {
        color: "#fff",
        fontSize: "15px"
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    },
    band: {
        width: '100%',
        height: '50px',
        marginTop: '30px',
        background: 'rgba(0, 0, 19, 0.8)'
    },
    cvvTitle: {
        paddingRight: '30px',
        fontSize: '15px',
        fontWeight: '500',
        color: '#fff',
        marginBottom: '5px',
    },
    cvvBand: {
        height: '45px',
        background: '#fff',
        marginBottom: '30px',
        marginLeft: '30px',
        marginRight: '30px',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '10px',
        color: '#1a3b5d',
        fontSize: '18px',
        borderRadius: '4px'
    },
    cvv: {
        textAlign: 'right',
        position: 'relative',
        marginTop: '20px'
    },
    flagContainer: {
        height: '45px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        maxWidth: '100px',
        marginLeft: 'auto',
        width: '100%',
    },
    flag: {
        paddingRight: '30px',
        maxWidth: '100%',
        objectFit: 'contain',
        maxHeight: '100%',
        objectPosition: 'top right'
    }
 }));