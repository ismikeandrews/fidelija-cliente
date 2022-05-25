import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Link } from 'react-router-dom';
import { Card, MenuItem, InputLabel, CardContent, Grid, Typography, Breadcrumbs, Link as MuiLink, Paper, TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab, CardMedia, CardActionArea, Tooltip, Select } from '@material-ui/core';
import { Add, NavigateNext } from '@material-ui/icons';
import { Styles } from './createSale.elements';
import { Snackbar, Backdrop } from '../../../Components';
import { ProductService } from '../../../Services';

const CreateSale = () => {
  const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
  const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
  const [infoMsg, setInfoMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [terms, setTerms] = useState('');
  const [price, setPrice] = useState('');
  const [endDate, setEndDate] = useState('1 mes');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [qnt, setQnt] = useState(0)
  const classes = Styles();

  const handleOpenDialog = async () => {
    try {
      const {data} = await ProductService.getUserProducts(1, 10);
      setProducts(data.data);
      setToggleDialog(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewSelectedProduct = event => {
    let products = selectedProducts;
    products.push(event.target.value)
  }

  const removeItem = id => {
    const itens = selectedProducts.filter(product => product === id)
    setSelectedProducts(itens)
  }
  
  return (
    <div>
      <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
          {infoMsg}
      </Snackbar>
      <Backdrop open={isLoading}/>
      <Dialog open={toggleDialog} maxWidth="lg" maxWidth>
        <DialogTitle id="customized-dialog-title" onClose={() => setToggleDialog(false)}>
          Produtos
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth variant="outlined"  className={classes.formControl}>
              <InputLabel id="product">Produtos</InputLabel>
              <Select
              labelId="product"
              value={products}
              onChange={e => handleNewSelectedProduct(e)}
              label="Multiplier">
                {products.map(product => (
                    <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField variant='outlined' label="Quantidade" type="number" value={qnt} onChange={e => setQnt(e.target.value)}/>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant='contained' onClick={() => setToggleDialog(false)} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.header}>
          <Typography variant="h5">
              Nova Promoção
          </Typography>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
              <MuiLink color="inherit" component={Link} to="/">
                  Home
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="#">
                  Nova Promoção
              </MuiLink>
          </Breadcrumbs>
      </div>
      <Paper variant="outlined" className={classes.contentSpacing}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField variant='outlined' label="Titulo da promoção" value={title} onChange={e => setTitle(e.target.value)}/>
          </FormControl>
         
          <Paper variant="outlined" className={clsx(classes.contentSpacing, classes.paperProduct)}>
            <Grid container>
              {selectedProducts.map(product => (
                <Grid item xs={2} key={product.id}>
                  <Card className={classes.prodCard}>
                    <Tooltip title="Remover" arrow>
                      <CardActionArea onClick={(product) => removeItem(product.id)}>
                          <CardMedia
                            component="img"
                            height="150"
                            image={product.image}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Quantidade: {product.qnt}
                            </Typography>
                          </CardContent>
                      </CardActionArea>
                    </Tooltip>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={2}>
                <Card className={classes.addProdCard} onClick={() => handleOpenDialog()}>
                  <Fab color='primary' className={classes.addButton} onClick={() => handleOpenDialog()}>
                    <Add/>
                  </Fab>
                  <Typography variant="overline" className={classes.addText}>Selecionar Produto</Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>
          <div style={{marginBottom: '1rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="expire">Validade</InputLabel>
                  <Select
                  labelId="expire"
                  value={endDate}
                  variant="outlined"
                  onChange={e => setEndDate(e.target.value)}
                  label="Validade">
                      <MenuItem value="1 Mês">1 Mês</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField variant='outlined' label="Valor" value={price} onChange={e => setPrice(e.target.value)}/>
                </FormControl>
                </Grid>
            </Grid>
          </div>
          <FormControl fullWidth className={classes.formControl}>
            <TextField 
              label="Termos de uso"
              multiline
              rows={4}
              value={terms}
              onChange={e => setTerms(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <Button variant="contained" color="primary">Salvar</Button>
      </Paper>
    </div>
  )
}

export default CreateSale