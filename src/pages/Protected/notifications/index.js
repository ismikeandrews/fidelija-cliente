import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    Typography,
    Breadcrumbs,
    Table,
    TableHead,
    TableBody,
    TableCell,
    Paper,
    TableRow,
    Badge,
    Grid,
    Backdrop,
    CircularProgress,
    Link as MuiLink
} from '@material-ui/core';
import { useStyles } from './NotificationsElements';
import { userService } from '../../../services';

const Notifications = () => {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const classes = useStyles();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await userService.notificationList(1, 20);
            console.log(res)
            setNotificationList(res.data.data)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde');
            setToggleFailureSnack(true);
        }
    }

    return (
        <div>   
            <div className={classes.header}>
                <Typography variant="h5">Notificações</Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Notificações
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Paper variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Mensagem</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationList.map(notification => (
                                <TableRow key={notification.id}>
                                    <TableCell>
                                        {notification.read === 0 && (
                                            <Badge color="primary" overlap="circle" variant="dot" style={{marginRight: '45px', zIndex: '0'}}></Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{notification.title}</TableCell>
                                    <TableCell>{notification.message}</TableCell>
                                    <TableCell>{moment(notification.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default Notifications;