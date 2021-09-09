import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import {
    Link as MuiLink,
    Breadcrumbs,
    Button as MuiButton,
    Backdrop,
    CircularProgress,
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
    Avatar
} from '@material-ui/core';
import { useStyles } from './EmployeeElements';
import { userService } from '../../../services';
import { Snackbar } from '../../../components';

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
    const [alreadyExist, setAlreadyExist] = useState(false)

    const classes = useStyles();
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const {data} = await userService.getEmployees();
            console.log(data)
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
        const data = {
            cpf: cpf,
            userType: employeeType
        };
        if(alreadyExist === false && cpf !== ''){
            try {
                await userService.setNewEmployee(data);
                await fetchData();
                setIsLoading(false);
                setInfoMsg('Funcionário vinculado');
                setToggleSuccessSnack(true);
                setOpenDialog(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setInfoMsg('ocorreu um erro ao tentar vincular');
                setToggleFailureSnack(true);
                setOpenDialog(false)
            }
        }else {
            setIsLoading(false)
            setInfoMsg("Insira um cpf válido");
            setToggleFailureSnack(true);
        }
    }

    const handleDelete = async (id) => {
        setOpenQuestionDialog(false);
        setIsLoading(true);
        try {
            await userService.deleteEmployee(id)
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
                const res = await userService.findEmployee(data);
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
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Dialog open={openDialog}  maxWidth="md" onClose={() => setOpenDialog(false)}>
                <DialogTitle>Cadastrar funcionário</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira o cpf de seu funcionário, para obter as funções de pontuação de sua loja.
                    </DialogContentText>
                    <InputMask maskChar="" mask="999.999.999-99" value={cpf} onChange={(e) => handleSearch(e.target.value)}>
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
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Funcionarios
                        </MuiLink>
                    </Breadcrumbs>
                </div>
                <div>
                    <MuiButton variant="contained" endIcon={<AddIcon/>} color="primary" onClick={() => setOpenDialog(true)}>
                        Novo Funcionário
                    </MuiButton>
                </div>
            </div>
            <div>
                <Paper variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell align="center">Tipo de funcionario</TableCell>
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
                                        ) : (
                                            <Chip style={{backgroundColor: '#c536f4' , color: 'white'}} size="small" label="Admin"/>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Desvincular">
                                            <IconButton>
                                                <DeleteOutlineIcon onClick={() => {setRelationId(employee.relation_id); setOpenQuestionDialog(true);}}/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default Employee;