import React, { useState, useRef, useEffect } from 'react'
import fileSize from 'filesize';
import { FileDrop } from 'react-file-drop'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Typography,
    Link as MuiLink,
    Grid,
    Paper,
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
    CircularProgress,
    Backdrop,
    Breadcrumbs,
    TextField
} from '@material-ui/core'

import { Snackbar, FButton, Textfield } from '../../../Components'
import { ProductService } from '../../../Services';
import { useStyles } from './CreatePrizeElements';
import { FilesSvg } from '../../../Assets'

const INITIAL_FORM_STATE = {
    productPrice: '',
    productName: '',
    productStock: '0',
}

const FORM_VALIDATION = Yup.object().shape({
    productPrice: Yup.number().integer().typeError('Campo numérico').required('Campo obrigatório'),
    productName: Yup.string().required('Campo obrigatório.'),
    productStock: Yup.number().integer().typeError('Campo numérico').required('Campo obrigatório')
})

const CreatePrize = () => {
    const classes = useStyles();
    const inputFile = useRef(null);

    const [uploadedFile, setUploadedFile] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [showCategories, setShowCategories] = useState(true);
    const [imgUrl, setImgUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [toggleErrorSnack, setToggleErrorSnack] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ocorreu um erro');
    const [dimentionError, setDimentionError] = useState(false);
    const [sizeError, setSizeError] = useState(false);


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
            console.log(categoryRes)
            setCategoryList(categoryRes.data);
            setIsLoading(false)
            setToggleSuccessSnack(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setToggleFailureSnack(true)
        }
    };

    const handleNewCategory = name => {
        let category = name;
        category === "" ? setShowCategories(true) : setShowCategories(false);
        setCategoryName(category)
        setCategoryId('')
    }

    const handleNewImage = (file) => {
        setUploadedFile(file)
        setImgUrl(URL.createObjectURL(file))
        let reader = new FileReader()
        reader.onload = e => {
            let img = new Image;
            img.onload = () => {
                if(img.width != img.height){
                    setDimentionError(true)
                }
            }
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
        if(file.size > 500000){
            setSizeError(true)
        }
    }

    const submitProduct = async (values, onSubmitProps) => {
        if (categoryName === '' && categoryId === '') {
            setErrorMsg('Selecione ou cadastre uma categoria para seu produto.')
            setToggleErrorSnack(true)
        }

        if(uploadedFile === null){
            setErrorMsg('Selecione uma imagem');
            setToggleErrorSnack(true);
        }

        if(dimentionError || sizeError){
            setErrorMsg('A imagem selecionada não é válida')
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
            await ProductService.setProduct(data);
            await fetchData();
            setCategoryId('');
            setCategoryName('');
            onSubmitProps.resetForm();
            setUploadedFile(null);
            setIsLoading(false);
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toggleFailureSnack(true)
        }
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack} time={3500} onClose={closeSnack} color="success">
                Produto cadastrado com sucesso
            </Snackbar>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} onClose={closeSnack} color="warning">
                Ocorreu um erro durante a conexão, tente novamente mais tarde
            </Snackbar>
            <Snackbar toggleSnack={toggleErrorSnack} time={4000} color="error">
                {errorMsg}
            </Snackbar>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.header}>
                <Typography variant="h5">
                    Criar um novo produto
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="/dashboard/prizes">
                        Produtos
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Criar novo produto
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values, onSubmitProps) => {
                submitProduct(values, onSubmitProps)
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
                                                        Arreste o arquivo direto do seu computador
                                                    </Typography>
                                                </div>
                                            </div>
                                        </FileDrop>
                                    </Paper>
                                    <input accept="image/*" hidden id="button-file" type="file" ref={inputFile} onChange={(e) => handleNewImage(e.target.files[0])}/>
                                    {uploadedFile !== null && (
                                        <Paper variant="outlined" className={[classes.contentSpacing, classes.paperImg]} style={{border: dimentionError || sizeError ? '1px solid #f44336' : ''}}>
                                            <Container>
                                                <div className={classes.previewFormat}>
                                                    <div className={classes.previewFormat}>
                                                        <img src={imgUrl} width="125" style={{border: '1px solid #f0f0f0'}}/>
                                                        <div style={{marginLeft: '20px'}}>
                                                            <Typography variant="subtitle1">{uploadedFile.name}</Typography>
                                                            <Typography variant="subtitle1">{fileSize(uploadedFile.size)}</Typography>
                                                        </div>
                                                        <div style={{marginLeft: '20px'}}>
                                                            {dimentionError && (
                                                                <Typography variant="body1" style={{ color: '#f44336'}}>A imagem deve ser quadrada</Typography>
                                                            )}
                                                            {sizeError && (
                                                                <Typography variant="body1" style={{ color: '#f44336'}}>A imagem deve ser menor que 500kB</Typography>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Tooltip title="Remover">
                                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => setUploadedFile(null)}>
                                                            <ClearIcon fontSize="default"/>
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
                                                        <Textfield variant="outlined" label="Estoque" name="productStock" type="number"/>
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
                                        <form>
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
                                        </form>
                                    </div>
                                </Container>
                            </Paper>
                            <FButton type="submit">Criar Produto</FButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePrize
