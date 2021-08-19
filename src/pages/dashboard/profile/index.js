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

import { userService } from '../../../services';

const Profile = () => {
    const [tabValue, setTabValue] = useState('1');
    const [isLoading, setIsLoading] = useState(true)
    
    const [userAdmin, setUserAdmin] = useState(null);
    const [userPhoto, setUserPhoto] = useState('');
    const [userName, setUserName] = useState('');
    const [userCreateAt, setUserCreateAt] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userZip, setUserZip] = useState('');
    const [userState, setUserState] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userNeighborhood, setUserNeighborhood] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userComplementation, setUserComplementation] = useState('');

    const [stablishmentName, setStablishmentName] = useState('');
    const [stablishmentCnpj, setStablishmentCnpj] = useState('');
    const [stablishmentPhone, setStablishmentPhone ] = useState('');
    const [stablishmentPhoto, setStablishmentPhoto] = useState('');
    const [stablishmentCreatedAt, setStablishmentCreatedAt] = useState('');
    const [stablishmentZip, setStablishmentZip] = useState('');
    const [stablishmentState, setStablishmentState] = useState('');
    const [stablishmentCity, setStablishmentCity] = useState('');
    const [stablishmentNeighborhood, setStablishmentNeighborhood] = useState('');
    const [stablishmentStreet, setStablishmentStreet] = useState('');
    const [stablishmentNumber, setStablishmentNumber] = useState('');
    const [stablishmentComplementation, setStablishmentComplementation] = useState('');

    const [stablishmentAddress, setStablishmentAddress] = useState({});
    const [stablishment, setStablishment] = useState({});
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res = await userService.getEmployeeInfo();
        console.log(res.data)
        setStablishment(res.data.stablishment)
        setStablishmentAddress(res.data.stablishment.address)

        setUserAdmin(res.data.isAdmin);
        setUserCreateAt(res.data.created_at);
        setUserName(res.data.name);
        setCpf(res.data.cpf);
        setEmail(res.data.email);
        setUserPhone(res.data.phone);
        setUserZip(res.data.address.zip);
        setUserState(res.data.address.state);
        setUserCity(res.data.address.city);
        setUserNeighborhood(res.data.address.neighborhood);
        setUserStreet(res.data.address.street);
        setUserNumber(res.data.address.number);
        setUserComplementation(res.data.address.complementation);
        setUserPhoto(res.data.photo);

        setStablishmentName(res.data.stablishment.name);
        setStablishmentCnpj(res.data.stablishment.cnpj);
        setStablishmentPhone(res.data.stablishment.phone);
        setStablishmentPhoto(res.data.stablishment.photo);
        setStablishmentCreatedAt(res.data.stablishment.created_at);
        setStablishmentZip(res.data.stablishment.address.zip)
        setStablishmentState(res.data.stablishment.address.state);
        setStablishmentCity(res.data.stablishment.address.city);
        setStablishmentNeighborhood(res.data.stablishment.address.neighborhood);
        setStablishmentStreet(res.data.stablishment.address.street);
        setStablishmentNumber(res.data.stablishment.address.number);
        setStablishmentComplementation(res.data.stablishment.address.complementation)

        setIsLoading(false);
    }

    const handleEdit = () => {
        const data = {};
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <Grid container>
                <TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={(event, newValue) => setTabValue(newValue)} aria-label="simple tabs example">
                            <Tab label="Perfil" value="1" />
                            <Tab label="Loja" value="2" />
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
                                                <Avatar src={process.env.REACT_APP_BASE_URL + userPhoto}>
                                                    <PersonIcon/>
                                                </Avatar>
                                            )}
                                            {isLoading ? (
                                                <Skeleton variant="rect" width={260} height={118}/>
                                            ) : (
                                                <>
                                                    <Typography variant="h5" component="h2">
                                                        {userName}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Membro desde: {moment(userCreateAt).format('DD/MM/YYYY')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Tipo de usuario: {userAdmin === 1 ? 'Administrador' : 'Funcionario'}
                                                    </Typography>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={9}>
                                    <Card>
                                        <CardContent>
                                            <form>
                                                <TextField
                                                label="CPF"
                                                InputProps={{readOnly: true}}
                                                value={cpf}
                                                variant="outlined"/>
                                                <TextField
                                                label="Email"
                                                value={email}
                                                variant="outlined" />
                                                <TextField
                                                label="Nome"
                                                value={userName}
                                                variant="outlined" />
                                                <TextField
                                                label="Telefone"
                                                value={userPhone}
                                                variant="outlined" />
                                                 <TextField
                                                label="CEP"
                                                value={userZip}
                                                variant="outlined" />
                                                <TextField
                                                label="Estado"
                                                value={userState}
                                                variant="outlined" />
                                                <TextField
                                                label="Cidade"
                                                value={userCity}
                                                variant="outlined" />
                                                <TextField
                                                label="Bairro"
                                                value={userNeighborhood}
                                                variant="outlined" />
                                                <TextField
                                                label="Logradouro"
                                                value={userStreet}
                                                variant="outlined" />
                                                <TextField
                                                label="Numero"
                                                value={userNumber}
                                                variant="outlined" />
                                                <TextField
                                                label="Complemento"
                                                value={userComplementation}
                                                variant="outlined" />
                                            </form>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value="2">
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Card>
                                        <CardContent>
                                            {isLoading ? (
                                                <Skeleton variant="circle" width={40} height={40}/>
                                            ) : (
                                                <Avatar src={process.env.REACT_APP_BASE_URL + stablishmentPhoto}>
                                                    <PersonIcon/>
                                                </Avatar>
                                            )}
                                            {isLoading ? (
                                                <Skeleton variant="rect" width={260} height={118}/>
                                            ) : (
                                                <>
                                                    <Typography variant="h5" component="h2">
                                                        {stablishmentName}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Meu plano: 
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Membro desde: {moment(stablishmentCreatedAt).format('DD/MM/YYYY')}
                                                    </Typography>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={9}>
                                    <Card>
                                        <CardContent>
                                            <form>
                                                <TextField
                                                label="CNPJ"
                                                InputProps={{readOnly: true}}
                                                value={stablishmentCnpj}
                                                variant="outlined"/>
                                                <TextField
                                                label="Nome"
                                                value={stablishmentName}
                                                variant="outlined" />
                                                <TextField
                                                label="Telefone"
                                                value={stablishmentPhone}
                                                variant="outlined" />
                                                <TextField
                                                label="CEP"
                                                value={stablishmentZip}
                                                variant="outlined" />
                                                <TextField
                                                label="Estado"
                                                value={stablishmentState}
                                                variant="outlined" />
                                                <TextField
                                                label="Cidade"
                                                value={stablishmentCity}
                                                variant="outlined" />
                                                <TextField
                                                label="Bairro"
                                                value={stablishmentNeighborhood}
                                                variant="outlined" />
                                                <TextField
                                                label="Logradouro"
                                                value={stablishmentStreet}
                                                variant="outlined" />
                                                <TextField
                                                label="Numero"
                                                value={stablishmentNumber}
                                                variant="outlined" />
                                                <TextField
                                                label="Complemento"
                                                value={stablishmentComplementation}
                                                variant="outlined" />
                                            </form>
                                        </CardContent>
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
