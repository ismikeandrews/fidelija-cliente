import React, { useEffect, useState } from 'react';
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    DialogContentText,
    Slide,
    CircularProgress,
    Snackbar,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography } from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { productService } from '../../../services';
import { CenterModal } from './prizesElements';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const filter = createFilterOptions();

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
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [products, setProducts] = useState([{},{},{},{},{},{},{},{}]);
    const [productId, setProductId] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const [pauseMode, setPauseMode] = useState(false);
    const [isPix, setIsPix] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenFormDialog = () => {
        setOpenFormDialog(true);
    }
    
    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
    };

    const handleOpenQuestionDialog = (id) => {
        setOpenQuestionDialog(true);
        setProductId(id)
    }
    
    const handleCloseQuestionDialog = () => {
        setOpenQuestionDialog(false);
    };

    const closeSnack = () => {
        setToggleSuccessSnack(false);
        setToggleFailureSnack(false);
    }

    const toggleEditMode = id => {
        const product = products.find(product => product.id = id);
        const category = categories.find(category => category.id = product.category_id);
        setCategoryName(category.name);
        setProductName(product.name);
        setProductStock(product.stock);
        setProductPrice(product.cost);
        setCategoryId(product.category_id);
        setUploadedFile(product.image);
        setProductId(id);
        setEditMode(true);
        handleOpenFormDialog();
    }

    const togglePauseMode = id => {
        setPauseMode(true);
        handleOpenQuestionDialog(id)
    }

    const toggleCreateMode = () => {
        setEditMode(false)
        handleOpenFormDialog();
    }

    const fetchData = async () => {
        try {
            const productsRes = await productService.getUserProducts();
            console.log(productsRes)
            const categoriesRes = await productService.getCategories();
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
            setToggleSkeleton(false);
        } catch (error) {
            console.log(error)
            setToggleFailureSnack(true);
        }
    }

    const newProduct = async () => {
        handleCloseFormDialog()
        setIsLoading(true)

        let data = new FormData()

        data.append('image', uploadedFile)
        data.append('name', productName)
        data.append('stock', parseInt(productStock))
        data.append('cost', parseInt(productPrice))
        data.append('category_id', categoryId)
        data.append('category_name', categoryName)

        
        try {
            await productService.setProduct(data)
            await fetchData()
            setIsLoading(false)
            setToggleSuccessSnack(true)
            setCategoryId('')
            setProductName('')
            setProductStock('')
            setProductPrice('')
            setUploadedFile({})
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setToggleFailureSnack(true)
        }
    }

    const editProduct = async () => {
        handleCloseFormDialog()
        setIsLoading(true)

        let data = new FormData()

        data.append('image', uploadedFile)
        data.append('name', productName)
        data.append('stock', parseInt(productStock))
        data.append('cost', parseInt(productPrice))
        data.append('category_id', categoryId)
        data.append('category_name', categoryName)

        try {
            await productService.editProduct(data, productId);
            await fetchData();
            setIsLoading(false);
            setToggleSuccessSnack(true);
            setCategoryId('');
            setProductName('');
            setProductStock('');
            setProductPrice('');
            setProductId('');
            setUploadedFile({})
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setToggleFailureSnack(true)
        }
    }

    const handleDelete = async (id) => {
        handleCloseQuestionDialog()
        setIsLoading(true)
        try {  
            await productService.deleteProduct(id);
            await fetchData();
            setIsLoading(false);
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setToggleFailureSnack(true)
        }
    }

    const handlePause = async (id) => {
        handleCloseQuestionDialog()
        setIsLoading(true)
        try {
           await productService.pauseProduct(id)
           await fetchData()
           setIsLoading(false);
           setPauseMode(false)
           setToggleSuccessSnack(true);
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

            <Dialog maxWidth="lg" open={openFormDialog} onClose={() => handleCloseFormDialog()} TransitionComponent={Transition} keepMounted>
                {editMode ? 
                    <>
                        <DialogTitle>Editar</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField autoFocus margin="dense" label="Nome do produto" variant="outlined" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Estoque" variant="outlined" fullWidth value={productStock} onChange={(e) => setProductStock(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Valor" variant="outlined" fullWidth value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/> 

                                <Autocomplete
                                    value={categoryName}
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            
                                            setCategoryName({
                                                name: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            setCategoryId("");

                                            setCategoryName(newValue.inputValue);
                                        } else {
                                            newValue === null ? setCategoryId("") : setCategoryId(newValue.id);
                                            setCategoryName(newValue);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        // Suggest the creation of a new value
                                        if (params.inputValue !== '') {
                                            filtered.push({
                                                inputValue: params.inputValue,
                                                name: `Add "${params.inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="category_name"
                                    options={categories}
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                        return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                        return option.inputValue;
                                        }
                                        // Regular option
                                        return option.name;
                                    }}
                                    renderOption={(option) => option.name}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField {...params} label="Categoria" variant="outlined" />
                                    )}
                                    />
                                    
                                <label htmlFor="button-file" >
                                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} component="span">
                                        Imagem
                                    </Button>
                                </label>
                                <input accept="image/*" style={{ display: "none"}} id="button-file" multiple type="file" onChange={(e) => setUploadedFile(e.target.files[0])}/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseFormDialog} color="secondary">
                                Cancelar
                            </Button>
                            <Button onClick={editProduct} color="primary">
                                Editar
                            </Button>
                        </DialogActions>
                    </>
                    :
                    <>
                        <DialogTitle>Criar um novo produto</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField autoFocus margin="dense" label="Nome do produto" variant="outlined" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Estoque" variant="outlined" fullWidth value={productStock} onChange={(e) => setProductStock(e.target.value)}/>
                                <TextField autoFocus margin="dense" label="Valor" variant="outlined" fullWidth value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>

                                <Autocomplete
                                    value={categoryName}
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            setCategoryName({
                                                name: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            setCategoryId("");

                                            setCategoryName(newValue.inputValue);
                                        } else {
                                            newValue === null ? setCategoryId("") : setCategoryId(newValue.id);
                                            setCategoryName(newValue);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        // Suggest the creation of a new value
                                        if (params.inputValue !== '') {
                                            filtered.push({
                                                inputValue: params.inputValue,
                                                name: `Add "${params.inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="category_name"
                                    options={categories}
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                        return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                        return option.inputValue;
                                        }
                                        // Regular option
                                        return option.name;
                                    }}
                                    renderOption={(option) => option.name}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField {...params} label="Categoria" variant="outlined" />
                                    )}
                                    />    
                                <label htmlFor="button-file" >
                                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} component="span">
                                        Imagem
                                    </Button>
                                </label>
                                <input accept="image/*" style={{ display: "none"}} id="button-file" multiple type="file" onChange={(e) => setUploadedFile(e.target.files[0])}/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseFormDialog} color="secondary">
                                Cancelar
                            </Button>
                            <Button onClick={newProduct} color="primary">
                                Cadastrar
                            </Button>
                        </DialogActions>
                    </>
                }
            </Dialog>

            <Dialog
            open={openQuestionDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleCloseQuestionDialog()}>
                <DialogTitle>{pauseMode === false ? "Deseja excluir?" : "Deseja ativar?" }</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {pauseMode === false ? "Você pode pausar o seu produto ao invés de excluir." : "Ative o seu produto"}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {pauseMode === false ? (
                        <>
                            <Button onClick={() => handleCloseQuestionDialog()} color="primary">
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
                    <Button onClick={() => handlePause(productId)} color="primary">
                        Ativar
                    </Button>
                    }
                    
                </DialogActions>
            </Dialog>

            <h1>Recompensas</h1>

            <Button variant="contained" color="primary" startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={() => toggleCreateMode()}>
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
                                    image={process.env.REACT_APP_BASE_URL + product.image}
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
                                    {product.active === 0 ? (
                                        <>
                                            <Button size="small" color="secondary" onClick={() => handleOpenQuestionDialog(product.id)}>
                                                Excluir
                                            </Button>
                                            <Button size="small" color="primary" onClick={() => toggleEditMode(product.id)}>
                                                Editar
                                            </Button>
                                        </>) :
                                        <Button size="small" color="primary" onClick={() => togglePauseMode(product.id)}>
                                            Ativar
                                        </Button>
                                    }
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>  
    )
}

export default Prizes;

