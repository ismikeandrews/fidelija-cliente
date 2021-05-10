import React, { useEffect, useState } from 'react';
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Slide,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Snackbar,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    AppBar,
    Tab } from '@material-ui/core';
import { Skeleton, TabPanel, TabContext, TabList, Alert } from '@material-ui/lab';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import CustomPaginationActionsTable from './table';
import { productService } from '../../../services';
import { CenterModal } from './prizesElements';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SnackType = props => {
    return (
        <Snackbar open={props.toggleSnack} autoHideDuration={props.time} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={props.onClose} severity={props.color} variant="filled">
                {props.children}
            </Alert>
        </Snackbar>
    )
}

const Prizes = () => {
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toggleSkeleton, setToggleSkeleton] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [products, setProducts] = useState([{},{},{},{},{},{},{},{}]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [productName, setProductName] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [tabsValue, setTabsValue] = useState('1');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const closeSnack = () => {
        setToggleSuccessSnack(false)
        setToggleFailureSnack(false)
    }


    const fetchData = async () => {
        try {
            const productsRes = await productService.getUserProducts();
            const categoriesRes = await productService.getCategories();

            console.log(productsRes.data);
            console.log(categoriesRes.data);

            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
            setToggleSkeleton(false);
        } catch (error) {
            console.log(error)
            setToggleFailureSnack(true);
        }
    }
    

    const newProduct = async () => {
        handleCloseDialog()
        setIsLoading(true)
        const data = {
            name: productName,
            stock: parseInt(productStock),
            cost: parseInt(productPrice),
            category_id: parseInt(categoryId),
        }  
        try {
            await productService.setProduct(data)
            await fetchData()
            setIsLoading(false)
            setToggleSuccessSnack(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setToggleFailureSnack(true)
        }
    }

    return (
        <div>
            {isLoading && (
                <CenterModal disableEnforceFocus disableAutoFocus open>
                    <CircularProgress color="primary" />
                </CenterModal>
            )}

            <SnackType toggleSnack={toggleSuccessSnack} time={3500} onClose={closeSnack} color="success">
                Produto cadastrado com sucesso
            </SnackType>

            <SnackType toggleSnack={toggleFailureSnack} time={4000} onClose={closeSnack} color="warning">
                Ocorreu um erro durante a conexão, tente novamente mais tarde
            </SnackType>

            <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition} keepMounted>
                <TabContext value={tabsValue}>
                    <AppBar position="static">
                        <TabList onChange={(event, newValue) => setTabsValue(newValue)}>
                            <Tab label="Produto" value="1" />
                            <Tab label="Categoria" value="2" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <DialogTitle>Criar um novo produto</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField autoFocus margin="dense" label="Nome do produto" variant="outlined" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Estoque" variant="outlined" fullWidth value={productStock} onChange={(e) => setProductStock(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Valor" variant="outlined" fullWidth value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="category-select">Categoria</InputLabel>
                                    <Select labelId="category-select" value={categoryId} onChange={e => setCategoryId(e.target.value)} label="Categoria">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {categories.map(category => (
                                            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>    
                                <label htmlFor="button-file" >
                                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} component="span">
                                        Imagem
                                    </Button>
                                </label>
                                <input accept="image/*" style={{ display: "none"}} id="button-file" multiple type="file"/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancelar
                            </Button>
                            <Button onClick={newProduct} color="primary">
                                Cadastrar
                            </Button>
                        </DialogActions>
                    </TabPanel>
                    <TabPanel value="2">
                        <DialogTitle>Criar uma nova categoria</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField autoFocus margin="dense" label="Nome do produto" variant="outlined" fullWidth value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancelar
                            </Button>
                            <Button onClick={newProduct} color="primary">
                                Cadastrar
                            </Button>
                        </DialogActions>
                    </TabPanel>
                </TabContext>
            </Dialog>

            <h1>Recompensas</h1>

            <Button variant="contained" color="primary" startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={handleOpenDialog}>
                Novo Produto
            </Button>
            
            <Grid container spacing={2}>
                {toggleSkeleton ? (
                    products.map((product, index) => (
                        <Grid key={index} item xs={3}>
                            <Card>
                                <CardActionArea>
                                    <Skeleton variant="rect" width={392} height={150} />
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton width="40%"/>
                                        <Skeleton variant="text"/>
                                        <Skeleton variant="text"/>
                                        <Skeleton variant="text" width="30%"/>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Skeleton variant="rect" width={100} height={25} />
                                </CardActions>
                            </Card>
                        </Grid>      
                    ))
                ) : (
                    products.map(product => (
                        <Grid key={product.id} item xs={3}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                    style={{height: 150}}
                                    image="https://via.placeholder.com/390x150/f0f0f0"
                                    title="Contemplative Reptile"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="subtitle1" component="p">
                                            Valor: {product.cost}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary">
                                        Editar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            <CustomPaginationActionsTable/>
        </div>  
    )
}

export default Prizes;

