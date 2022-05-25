import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import fileSize from 'filesize';
import { FileDrop } from 'react-file-drop'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { NavigateNext, Clear } from '@material-ui/icons';
import { Typography, Link as MuiLink, Grid, Paper, Container, Select, MenuItem, FormControl, InputLabel, IconButton, Tooltip, Breadcrumbs, TextField } from '@material-ui/core'
import { Snackbar, FButton, Textfield, ImageCropper, Backdrop, AlertDialog } from '../../../Components'
import { ProductService, AuthService } from '../../../Services';
import { FilesSvg } from '../../../Assets'
import { Styles } from './create-prize.elements';

const INITIAL_FORM_STATE = {
    productName: '',
    productStock: '0',
}

const FORM_VALIDATION = Yup.object().shape({
    productName: Yup.string().required('Campo obrigatório.'),
    productStock: Yup.number().integer().typeError('Campo numérico').required('Campo obrigatório')
})

const CreatePrize = () => {
    const classes = Styles();
    const inputFile = useRef(null);
    const [openDialog, setOpenDialog] = useState(false)
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
    const [products, setProducts] = useState([]);
    const [toggleAlert, setToggleAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertText, setAlertText] = useState('');
    const [link, setLink] = useState('');
    const [multiplier, setMultiplier] = useState(5);
    const [points, setPoints] = useState(0);
    const [ammount, setAmmount] = useState(0)

    useEffect(() => {
        fetchData()
    },[])

    const closeSnack = () => {
        setToggleSuccessSnack(false);
        setToggleFailureSnack(false);
    }

    const fetchData = async () => {
        try {
            const productsRes = await ProductService.getUserProducts(1, 5); 
            const categoryRes = await ProductService.getCategories();
            setProducts(productsRes.data.data)
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
        setImgUrl(URL.createObjectURL(file))
        setOpenDialog(true)
    }

    const submitProduct = async (values, onSubmitProps) => {
        if(AuthService.checkMembership() || products.length < 5){
            if (categoryName === '' && categoryId === '') {
                setErrorMsg('Selecione ou cadastre uma categoria para seu produto.')
                setToggleErrorSnack(true)
            }   
            setIsLoading(true)
            let data = new FormData()
            data.append('image', uploadedFile)
            data.append('name', values.productName)
            data.append('stock', values.productStock)
            data.append('cost', points)
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
                setToggleFailureSnack(true)
            }
        } else {
            setIsLoading(false)
            setToggleAlert(true);
            setAlertText('Faça um upgrade de plano e adicione mais produtos');
            setAlertTitle('Limite de produtos!');
            setLink("/dashboard/subscription")
        }
    }

    const calculator = (mult, amm) => {
        console.log(mult)
        if(mult === 5){
            const value = amm  * 100
            setPoints(value)
        }else if(mult === 10){
            const value = amm  * 50
            setPoints(value)
        }else if(mult === 20){
            const value = amm  * 25
            setPoints(value)
        }
        setMultiplier(mult)
        setAmmount(amm)
    }

    return (
        <div>
            <AlertDialog open={toggleAlert} title={alertTitle} text={alertText} link={link}/>
            <ImageCropper open={openDialog} close={() => setOpenDialog(false)} url={imgUrl} handleChange={setUploadedFile}/>
            <Snackbar toggleSnack={toggleSuccessSnack} time={3500} onClose={closeSnack} color="success">
                Produto cadastrado com sucesso
            </Snackbar>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} onClose={closeSnack} color="warning">
                Ocorreu um erro durante a conexão, tente novamente mais tarde
            </Snackbar>
            <Snackbar toggleSnack={toggleErrorSnack} time={4000} color="error">
                {errorMsg}
            </Snackbar>
            
            <Backdrop open={isLoading}/>
            <div className={classes.header}>
                <Typography variant="h5">
                    Criar um novo produto
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
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
            onSubmit={(values, onSubmitProps) => {submitProduct(values, onSubmitProps)}}>
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
                                    {uploadedFile !== null && (
                                        <Paper variant="outlined" className={clsx(classes.contentSpacing, classes.paperImg)}>
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
                                                    <TextField  variant="outlined" label="Preço" value={ammount} onChange={e => calculator(multiplier, e.target.value)} helperText="Valor em Reais"/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl fullWidth variant="outlined"  className={classes.formControl}>
                                                    <InputLabel id="multi">Multiplicador</InputLabel>
                                                    <Select
                                                    labelId="multi"
                                                    value={multiplier}
                                                    onChange={e => calculator(e.target.value, ammount)}
                                                    label="Multiplier">
                                                        <MenuItem value={20}>20%</MenuItem>
                                                        <MenuItem value={10}>10%</MenuItem>
                                                        <MenuItem value={5}>5%</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <TextField variant="outlined" disabled value={points} type="number" helperText="Pontos"/>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Textfield variant="outlined" label="Estoque" name="productStock" type="number"/>
                                            </FormControl>
                                        </Grid>
                                    </div>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper variant="outlined" className={clsx(classes.contentSpacing, classes.submitButton)}>
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
                            <FButton type="submit">Criar Produto</FButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePrize
