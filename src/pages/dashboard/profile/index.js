import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

import { authService } from '../../../services';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [tabValue, setTabValue] = useState('1');
    const [userEmail, setUserEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        const data = authService.getLoggedUser();
        setUserInfo(data);
        setUserEmail(data.email);
        setIsLoading(false);
    }

    return (
        <div>
            <h1>Profile</h1>
            <Grid container>
                <TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={(event, newValue) => setTabValue(newValue)} aria-label="simple tabs example">
                            <Tab label="Geral" value="1" />
                            <Tab label="Plano" value="2" />
                            <Tab label="Notificações" value="3" />
                            <Tab label="Segurança" value="4" />
                        </TabList>
                    </AppBar>
                    <Grid item xs={12}>
                        <TabPanel value="1">
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Card>
                                        <CardContent>
                                            {isLoading ? (
                                                <Skeleton variant="circle" width={40} height={40}/>
                                            ) : (
                                                <Avatar>
                                                    <PersonIcon/>
                                                </Avatar>
                                            )}
                                            {isLoading ? (
                                                <Skeleton variant="rect" width={260} height={118}/>
                                            ) : (
                                                <>
                                                    <Typography variant="h5" component="h2">
                                                        {userInfo.name}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Meu plano: 
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Membro desde: {moment(userInfo.created_at).format('DD/MM/YYYY')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Tipo de usuario: {userInfo.is_admin === 1 ? 'Administrador' : 'Funcionario'}
                                                    </Typography>
                                                </>
                                            )}
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={9}>
                                    <Card>
                                        <CardContent>
                                            <form>
                                                <TextField
                                                label="CPF"
                                                InputProps={{readOnly: true}}
                                                value={userInfo.cpf}
                                                variant="outlined"/>
                                                <TextField
                                                label="Email"
                                                value={userEmail}
                                                variant="outlined" 
                                                onChange={e => setUserEmail(e.target.value)}/>
                                            </form>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                            <Typography variant="h5" component="h2">
                                                {userInfo.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                            <Typography variant="h5" component="h2">
                                                {userInfo.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value="4">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                            <Typography variant="h5" component="h2">
                                                {userInfo.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </TabContext>
            </Grid>
        </div>
    )
}

export default Profile;
