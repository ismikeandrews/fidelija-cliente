import React, { useState, useRef, useEffect } from 'react'
import fileSize from 'filesize';
import { FileDrop } from 'react-file-drop'
import { Link, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { NavigateNext, Clear } from '@material-ui/icons';
import { Typography, Link as MuiLink, Grid, Paper, Container, Select, MenuItem, FormControl, InputLabel, IconButton, Tooltip, Breadcrumbs, TextField } from '@material-ui/core'
import { Snackbar, Textfield, FButton, ImageCropper, Backdrop } from '../../../Components'
import { ProductService } from '../../../Services';
import { FilesSvg } from '../../../Assets'
import { Styles } from './edit-prize.elements';

const FORM_VALIDATION = Yup.object().shape({
    productPrice: Yup.number().integer().typeError('Campo numérico').required('Campo obrigatório'),
    productName: Yup.string().required('Campo obrigatório.'),
    productStock: Yup.number().integer().typeError('Campo numérico').required('Campo obrigatório')
})

const EditPrize = () => {
    const { id } = useParams();
    const classes = Styles();
    const inputFile = useRef(null);
    const [openDialog, setOpenDialog] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [showCategories, setShowCategories] = useState(true);
    const [imgUrl, setImgUrl] = useState('');
    const [currentImage, setCurrentImage] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [toggleErrorSnack, setToggleErrorSnack] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ocorreu um erro');
    const [formValues, setFormValues] = useState({productPrice: '', productName: '', productStock: ''});

    useEffect(() => {
        fetchData()
    },[])

    const closeSnack = () => {
        setToggleSuccessSnack(false);
        setToggleFailureSnack(false);
    }

    const fetchData = async () => {

        try {
            const categoryRes = await ProductService.getCategories();
            const productRes = await ProductService.getProduct(id)
            const values = {
                productPrice: productRes.data.cost, 
                productName: productRes.data.name, 
                productStock: productRes.data.stock
            }
            setCategoryList(categoryRes.data);
            setFormValues(values)
            setCategoryId(productRes.data.category_id);
            setCurrentImage(process.env.REACT_APP_BASE_URL + productRes.data.image)

            setIsLoading(false)
            setToggleSuccessSnack(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toggleFailureSnack(true)
        }
    };

    const handleNewCategory = name => {
        let category = name;
        category === "" ? setShowCategories(true) : setShowCategories(false);
        setCategoryName(category)
        setCategoryId('')
    }

    const handleNewImage = (file) => {
        setImgUrl(URL.createObjectURL(file))
        setOpenDialog(true)
    }

    const editProduct = async (values) => {
        if (categoryName === '' && categoryId === '') {
            setErrorMsg('Selecione ou cadastre uma categoria para seu produto.')
            setToggleErrorSnack(true)
        }
        setIsLoading(true)
        let data = new FormData()
        data.append('image', uploadedFile)
        data.append('name', values.productName)
        data.append('stock', values.productStock)
        data.append('cost', values.productPrice)
        data.append('category_id', categoryId)
        data.append('category_name', categoryName)
        
        try {
            await ProductService.editProduct(data, id);
            await fetchData();
            setCategoryName('');
            setUploadedFile(null);
            setIsLoading(false);
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setToggleFailureSnack(true)
        }
    }

    return (
        <div>
            <ImageCropper open={openDialog} close={() => setOpenDialog(false)} url={imgUrl} handleChange={setUploadedFile}/>
            <Snackbar toggleSnack={toggleSuccessSnack} time={3500} onClose={closeSnack} color="success">
                Produto editado.
            </Snackbar>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} onClose={closeSnack} color="warning">
                Ocorreu um erro durante a conexão, tente novamente mais tarde.
            </Snackbar>
            <Snackbar toggleSnack={toggleErrorSnack} time={4000} color="error">
                {errorMsg}
            </Snackbar>

            <Backdrop open={isLoading}/>
            <div className={classes.header}>
                <Typography variant="h5">
                    Editar produto
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Dashboard
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="/dashboard/prizes">
                        Produtos
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Editar produto
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <Formik
            enableReinitialize={true}
            initialValues={formValues}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                editProduct(values)
            }}>
                <Form>
                    <Grid container spacing={4}>
                        <Grid item xs={8}>
                            <Paper variant="outlined" className={classes.contentSpacing}>
                                <Container>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Textfield label="Nome do Produto" name="productName"/>
                                    </FormControl>
                                    <Typography variant="h6" className={classes.infoTitle}>
                                        Upload de imagens
                                    </Typography>
                                    <Paper variant="outlined" className={classes.paperFiles} onClick={() => inputFile.current.click()}>
                                        <FileDrop onFrameDrop={(e) => handleNewImage(e.dataTransfer.files[0])}>
                                            <div className={classes.files}>
                                                <img src={FilesSvg} width="100"/>
                                                <div>
                                                    <Typography variant="subtitle1">
                                                        Selecione a imagem
                                                    </Typography>
                                                    <Typography variant="overline">
                                                        Arraste o arquivo direto do seu computador
                                                    </Typography>
                                                </div>
                                            </div>
                                        </FileDrop>
                                    </Paper>
                                    <input accept="image/*" hidden id="button-file" type="file" ref={inputFile} onChange={(e) => handleNewImage(e.target.files[0])}/>
                                    <Paper variant="outlined" className={[classes.contentSpacing, classes.paperImg]}>
                                            <Container>
                                                <div className={classes.previewFormat}>
                                                    <div>
                                                        <img src={currentImage} width="125" style={{border: '1px solid #f0f0f0'}}/>
                                                    </div>
                                                    <div style={{marginLeft: '20px'}}>
                                                        <Typography variant="subtitle1">Imagem atual</Typography>
                                                    </div>
                                                </div>
                                            </Container>
                                        </Paper>
                                    {uploadedFile !== null && (
                                        <Paper variant="outlined" className={[classes.contentSpacing, classes.paperImg]}>
                                            <Container>
                                                <div className={classes.previewFormat}>
                                                    <div className={classes.previewFormat}>
                                                        <img src={imgUrl} width="125" style={{border: '1px solid #f0f0f0'}}/>
                                                        <div style={{marginLeft: '20px'}}>
                                                            <Typography variant="subtitle1">{uploadedFile.name}</Typography>
                                                            <Typography variant="subtitle1">{fileSize(uploadedFile.size)}</Typography>
                                                        </div>
                                                    </div>
                                                    <Tooltip title="Remover">
                                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => setUploadedFile(null)}>
                                                            <Clear fontSize="default"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </Container>
                                        </Paper>
                                    )}
                                    <Typography variant="h6" className={classes.infoTitle}>
                                        Preço e estoque
                                    </Typography>
                                    <div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth className={classes.formControl}>
                                                        <Textfield  variant="outlined" label="Preço" name="productPrice" helperText="Valor em pontos"/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth className={classes.formControl}>
                                                        <Textfield variant="outlined" label="Estoque" name="productStock"/>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper variant="outlined" className={[classes.contentSpacing, classes.submitButton]}>
                                <Container>
                                    <div>
                                        <Typography variant="h6" className={classes.infoTitle}>
                                            Categoria
                                        </Typography>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField fullWidth variant="outlined" label="Nova Categoria" name="categoryName" value={categoryName} onChange={e => handleNewCategory(e.target.value)}/>
                                        </FormControl>
                                        {showCategories && (
                                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                                <InputLabel id="category">Categorias</InputLabel>
                                                <Select
                                                labelId="category"
                                                value={categoryId}
                                                onChange={e => setCategoryId(e.target.value)}
                                                label="Categorias">
                                                    {categoryList.map(category => (
                                                        <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </div>
                                </Container>
                            </Paper>
                            <FButton type="submit">Salvar</FButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    )
}

export default EditPrize
