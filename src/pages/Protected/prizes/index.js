import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import { 
    Button, 
    Breadcrumbs,
    Link as MuiLink,
    OutlinedInput,
    Chip,
    Container,
    Backdrop,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    DialogContentText,
    Slide,
    CircularProgress,
    Grid,
    Typography, 
    Paper,
    InputAdornment,
    FormControl,
    InputLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    TablePagination,
    Divider,
    useTheme
} from '@material-ui/core';

import { Snackbar } from '../../../Components'
import { ProductService } from '../../../Services';
import { useStyles } from './prizesElements';
import { EmptySvg } from '../../../Assets'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Prizes = () => {
    const classes = useStyles();
    const theme = useTheme();
    const timeoutRef = useRef(null);

    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const [pauseMode, setPauseMode] = useState(false);
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [feedbackAlert, setFeedbackAlert] = useState('');
    const [lastPage, setLastPage] = useState(null);

    useEffect(() => {
        fetchData(page, item);
    }, []);

    const fetchData = async (currentPage, rowsPerPage) => {
        try {
            const productsRes = await ProductService.getUserProducts(currentPage, rowsPerPage);
            console.log(productsRes);
            setProducts(productsRes.data.data);
            setPage(productsRes.data.current_page);
            setItem(productsRes.data.per_page);
            setLastPage(productsRes.data.last_page);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setFeedbackAlert('Ocorreu um erro ao conectar com o servidor, tente novamente mais tarde');
            setToggleFailureSnack(true);
        }
    }

    const handleSearch = (name) => {
        setSearchTerm(name);
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(async () => {
            try {
                setIsLoading(true);
                const productsRes = await ProductService.searchUserProducts(page, item, name);
                setProducts(productsRes.data.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setFeedbackAlert('Ocorreu um erro ao conectar com o servidor, tente novamente mais tarde');
                setToggleFailureSnack(true);
            }
        }, 500);
    }
    
    const handleOpenQuestionDialog = (id) => {
        setOpenQuestionDialog(true);
        setProductId(id);
    }


    const togglePauseMode = id => {
        setPauseMode(true);
        handleOpenQuestionDialog(id);
    }

    const closeSnack = () => {
        setToggleSuccessSnack(false);
        setToggleFailureSnack(false);
    }

    const handleDelete = async (id) => {
        setOpenQuestionDialog(false);
        setIsLoading(true);
        try {  
            await ProductService.deleteProduct(id);
            await fetchData(page, item);
            setIsLoading(false);
            setFeedbackAlert('Produto excluido.');
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setFeedbackAlert('Ocorreu um erro ao tentar excluir.');
            setToggleFailureSnack(true);
        }
    }

    const handlePause = async (id) => {
        setOpenQuestionDialog(false);
        setIsLoading(true);
        try {
           await ProductService.pauseProduct(id);
           await fetchData(page, item)
           setIsLoading(false);
           setPauseMode(false);
           setFeedbackAlert('Produto alterado.');
           setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setFeedbackAlert('Ocorreu um erro ao tentar pausar.');
            setToggleFailureSnack(true);
        }
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack} time={3500} onClose={closeSnack} color="success">
                {feedbackAlert}
            </Snackbar>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} onClose={closeSnack} color="warning">
                {feedbackAlert}
            </Snackbar>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
            open={openQuestionDialog}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            onClose={() =>  setOpenQuestionDialog(false)}>
                <DialogTitle>{pauseMode === false ? "Selecione uma ação" : "Deseja ativar?" }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {pauseMode === false ? "Você pode pausar o seu produto ao invés de excluir." : "Ative o seu produto"}
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    {pauseMode === false ? (
                        <>
                            <Button onClick={() =>  setOpenQuestionDialog(false)} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={() => handlePause(productId)} color="primary">
                                Pausar
                            </Button>
                            <Button onClick={() => handleDelete(productId)} color="secondary">
                                Excluir
                            </Button>
                        </>
                    )
                    :
                    <>
                        <Button onClick={() =>  setOpenQuestionDialog(false)} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={() => handlePause(productId)} color="primary">
                            Ativar
                        </Button>
                    </>
                    }
                    
                </DialogActions>
            </Dialog>
            <div className={classes.header}>
                <div>
                    <Typography variant="h5">
                        Meus produtos
                    </Typography>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Produtos
                        </MuiLink>
                    </Breadcrumbs>
                </div>
                {products.length > 0 && (
                    <div>
                        <Button variant="contained" color="primary" endIcon={<AddIcon/>} component={Link} to="/dashboard/create-prize">
                            Novo produto
                        </Button>
                    </div>
                )}
            </div>
            
            <div>
                {isLoading || (
                    <Paper variant="outlined">
                        {products.length > 0 ? (
                            <>
                                <div className={classes.topMenu}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel htmlFor="search">Procurar</InputLabel>
                                                <OutlinedInput
                                                id="search"
                                                label="procurar"
                                                value={searchTerm}
                                                onChange={e => handleSearch(e.target.value)}
                                                endAdornment={<InputAdornment position="end"><SearchIcon color="primary"/></InputAdornment>}/>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Divider/>
                                <div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Imagem</TableCell>
                                                <TableCell align="left">Nome</TableCell>
                                                <TableCell align="left">Categoria</TableCell>
                                                <TableCell align="center">Disponibilidade</TableCell>
                                                <TableCell align="center">Estoque (Unidades)</TableCell>
                                                <TableCell align="center">Valor (Pontos)</TableCell>
                                                <TableCell align="right">Ações</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map(product => (
                                                <TableRow key={product.id} hover>
                                                    <TableCell component="th" scope="row"><img src={process.env.REACT_APP_BASE_URL + product.image} width="100"/></TableCell>
                                                    <TableCell align="left">{product.name}</TableCell>
                                                    <TableCell align="left">{product.category.name}</TableCell>
                                                    <TableCell align="center">    
                                                        { product.stock === 0 ? (
                                                            <Chip style={{backgroundColor: '#f44336' , color: 'white'}} size="small" label="Sem estoque"/>
                                                        ) : product.stock < 6 ? (
                                                            <Chip style={{backgroundColor: '#ff9800' , color: 'white'}} size="small" label="Ultimas unidades"/>
                                                        ) : (
                                                            <Chip style={{backgroundColor: '#4caf50' , color: 'white'}} size="small" label="Em estoque"/>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">{product.stock}</TableCell>
                                                    <TableCell align="center">{product.cost}</TableCell>
                                                    <TableCell align="right">
                                                        <Tooltip title="Editar">
                                                            <IconButton aria-label="delete" component={Link} to={`/dashboard/edit-prize/${product.id}`}>
                                                                <CreateRoundedIcon/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        {product.active === 1 ? (
                                                                <Tooltip title="Excluir/Pausar">
                                                                    <IconButton aria-label="Configurações">
                                                                        <SettingsRoundedIcon onClick={() => handleOpenQuestionDialog(product.id)}/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            ) :
                                                            <Tooltip title="Ativar">
                                                                <IconButton aria-label="resume">
                                                                    <PlayArrowRoundedIcon onClick={() => togglePauseMode(product.id)}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={products.length - 1}
                                    rowsPerPage={item}
                                    page={page - 1}
                                    onChangePage={() => null}
                                    labelRowsPerPage="Produtos por página:"
                                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== 0 ? count : `more than ${to}`}`}
                                    onChangeRowsPerPage={(event) => fetchData(1, event.target.value)}
                                    ActionsComponent={() => (
                                        <div className={classes.paginationIcons}>
                                            <IconButton
                                                onClick={() => fetchData(1, item)}
                                                disabled={page === 1}
                                                aria-label="first page">
                                                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => fetchData(page - 1, item)} 
                                                disabled={page === 1} 
                                                aria-label="previous page">
                                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                            </IconButton>
                                            <IconButton
                                                onClick={() => fetchData(page + 1, item, searchTerm)}
                                                disabled={page === lastPage}
                                                aria-label="next page">
                                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                            </IconButton>
                                            <IconButton
                                                onClick={() => fetchData(lastPage, item)}
                                                disabled={page === lastPage}
                                                aria-label="last page">
                                                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                                            </IconButton>
                                        </div>
                                    )}/>
                                </div>
                            </>
                        ) : (
                            <div className={classes.noProducts}>
                                <Container>
                                    <img src={EmptySvg} width="250"/>
                                    <Typography variant="h6" className={classes.noProductsMg}>
                                        Você ainda não possui um produto
                                    </Typography>
                                    <Button variant="contained" color="primary" endIcon={<AddIcon/>} component={Link} to="/dashboard/create-prize">
                                        Novo produto
                                    </Button>
                                </Container>
                            </div>
                        ) }
                    </Paper>
                )}
            </div>
        </div>  
    )
}

export default Prizes;

