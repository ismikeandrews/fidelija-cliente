import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { NavigateNext, DeleteOutline, Add } from '@material-ui/icons';
import {
    Link as MuiLink,
    Breadcrumbs,
    Button as MuiButton,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Tooltip,
    IconButton,
    Avatar,
    Container
} from '@material-ui/core';
import { Styles } from './employee.elements';
import { UserService, AuthService } from '../../../Services';
import { Snackbar, Backdrop, AlertDialog } from '../../../Components';
import { PeopleSvg } from '../../../Assets';

const Employee = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const [cpf, setCpf] = useState('');
    const [employeeType, setEmployeeType] = useState('3');
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const [relationId, setRelationId] = useState('');
    const [alreadyExist, setAlreadyExist] = useState(false);
    const [toggleAlert, setToggleAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertText, setAlertText] = useState('');
    const [link, setLink] = useState('');
    const classes = Styles();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const {data} = await UserService.getEmployees();
            setEmployeeList(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao buscar os funcionários');
            setToggleFailureSnack(true);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setOpenDialog(false)
        const data = {
            cpf: cpf,
            userType: employeeType
        };
        if (AuthService.checkMembership() || employeeList.length < 1) {
            if(employeeList.length <= 10){
                if(alreadyExist === false && cpf !== ''){
                    try {
                        await UserService.setNewEmployee(data);
                        await fetchData();
                        setIsLoading(false);
                        setInfoMsg('Funcionário vinculado');
                        setToggleSuccessSnack(true);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                        setInfoMsg('ocorreu um erro ao tentar vincular');
                        setToggleFailureSnack(true);
                    }
                }else {
                    setIsLoading(false)
                    setInfoMsg("Insira um cpf válido");
                    setToggleFailureSnack(true);
                }
            } else {
                setIsLoading(false);
                setToggleAlert(true);
                setAlertText('Seu plano permite 10 somente funcionários.');
                setAlertTitle('Limite de funcionários');
                setLink('')
            }
        } else {
            setIsLoading(false)
            setToggleAlert(true);
            setAlertText('Faça um upgrade de plano e adicione mais funcionários');
            setAlertTitle('Limite de funcionários');
            setLink("/dashboard/subscription")
        }
    }

    const handleDelete = async (id) => {
        setOpenQuestionDialog(false);
        setIsLoading(true);
        try {
            await UserService.deleteEmployee(id)
            await fetchData();
            setIsLoading(false);
            setInfoMsg("Funcionário desvinculado");
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setInfoMsg("Ocorreu um erro ao desvincular");
            setToggleFailureSnack(true)
        }
    }

    const handleSearch = async (cpf) => {
        setCpf(cpf)
        const data = {
            cpf: cpf
        }
        if (cpf.length === 14) {
            try {
                const res = await UserService.findEmployee(data);
                if (res.data !== '') {
                    setAlreadyExist(true);
                    setInfoMsg("Usuário já vinculado.");
                    setToggleFailureSnack(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <AlertDialog open={toggleAlert} title={alertTitle} text={alertText} close={() => setToggleAlert(false)} link={link}/>
            <Backdrop open={isLoading}/>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Dialog open={openDialog}  maxWidth="md" onClose={() => setOpenDialog(false)}>
                <DialogTitle>Cadastrar funcionário</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira o cpf de seu funcionário, para obter as funções de pontuação de sua loja.
                    </DialogContentText>
                    <InputMask maskChar="" required mask="999.999.999-99" value={cpf} onChange={(e) => handleSearch(e.target.value)}>
                        {props => (
                            <TextField autoFocus label="CPF" type="text" variant="outlined" fullWidth className={classes.input}/>
                        )}
                    </InputMask>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo de funcionário</FormLabel>
                        <RadioGroup  name="type" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
                            <FormControlLabel value="3" control={<Radio />} label="Funcionário" />
                            <FormControlLabel value="2" control={<Radio />} label="Administrador" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={() => setOpenDialog(false)} color="primary">
                        Cancelar
                    </MuiButton>
                    <MuiButton onClick={() => handleSubmit()} color="primary">
                        Cadastrar
                    </MuiButton>
                </DialogActions>
            </Dialog>
            <Dialog
            open={openQuestionDialog}
            maxWidth="lg"
            onClose={() => setOpenQuestionDialog(false)}>
                <DialogTitle>Desvincular</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Deseja desvincular esse usuario como seu funcionario?
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <MuiButton onClick={() => setOpenQuestionDialog(false)} color="primary">
                        Cancelar
                    </MuiButton>
                    <MuiButton onClick={() => handleDelete(relationId)} color="secondary">
                        Continuar
                    </MuiButton>
                </DialogActions>
            </Dialog>
            <div className={classes.header}>
                <div>
                    <Typography variant="h6">Funcionarios</Typography>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Funcionarios
                        </MuiLink>
                    </Breadcrumbs>
                </div>
                {employeeList.length > 0 && (
                    <div>
                        <MuiButton variant="contained" endIcon={<Add/>} color="primary" onClick={() => setOpenDialog(true)}>
                            Novo Funcionário
                        </MuiButton>
                    </div>
                )}
            </div>
            {isLoading || (
                <div>
                    {employeeList.length > 0 ? (
                        <Paper variant="outlined">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>CPF</TableCell>
                                        <TableCell align="center">Tipo de funcionário</TableCell>
                                        <TableCell align="right">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employeeList.map(employee => (
                                        <TableRow key={employee.id}>
                                            <TableCell>
                                                <div className={classes.imgText}>
                                                    <Avatar alt={employee.name} src={process.env.REACT_APP_BASE_URL + employee.photo} style={{marginRight: "10px"}}/>
                                                    {employee.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{employee.cpf}</TableCell>
                                            <TableCell align="center">
                                                {employee.type === 3 ? (
                                                    <Chip style={{backgroundColor: '#36f4d8' , color: 'black'}} size="small" label="Funcionário"/>
                                                ) : employee.type === 2 && (
                                                    <Chip style={{backgroundColor: '#c536f4' , color: 'white'}} size="small" label="Admin"/>
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Desvincular">
                                                    <IconButton onClick={() => {setRelationId(employee.relation_id); setOpenQuestionDialog(true);}}>
                                                        <DeleteOutline/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    ) : (
                        <div className={classes.noEmployee}>
                            <Container>
                                <img src={PeopleSvg} width="250"/>
                                <Typography variant="h6" className={classes.noEmployeeMsg}>
                                    Você ainda não possui um funcionário
                                </Typography>
                                <MuiButton variant="contained" endIcon={<Add/>} color="primary" onClick={() => setOpenDialog(true)}>
                                    Novo Funcionário
                                </MuiButton>
                            </Container>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Employee;