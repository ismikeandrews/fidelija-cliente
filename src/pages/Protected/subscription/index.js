import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, Paper, Button} from '@material-ui/core'
import { RocketSvg } from '../../../Assets';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    margin: theme.spacing(2),
  },
  textContent: {
    padding: theme.spacing(2),
    textAlign: 'center',  
  },
  elementsContent: {
    padding: theme.spacing(2),
  },
  img: {
    width: '300px',
    display: 'block',
    margin: 'auto',
  },
  list: {
    listStyle: 'none',
  },
  paper: {
    padding: theme.spacing(10),
  }
}));

const Subscription = () => {
    const classes = useStyles();

    return (
      <div>
        <Container>
          <div className={classes.main}>
            <Paper variant="outlined" className={classes.paper}>
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                <Grid item xs={7}>
                  <Grid className={classes.textContent}>
                    <Typography variant="h4">
                      Teste por 3 mêses grátis.
                    </Typography>
                    <Typography variant="capitation">
                      Após o periodo de teste valor mensal de R$ 49,90
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <ul className={classes.list}>
                        <li>
                          <Typography variant="overline">
                            Desconto em serviços.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="overline">
                            Envio de emails de marketing.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="overline">
                            Quantidade ilimitada de prêmios.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="overline">
                            Notificação para prospecção de clientes.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="overline">
                            Acesso a todas a funções do painel de controle.
                          </Typography>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container direction="column" className={classes.elementsContent}>
                    <Grid item xs={12} className={classes.elementsContent}>
                      <img className={classes.img} src={RocketSvg}/>
                    </Grid>
                    <Grid item xs={12}> 
                      <Button fullWidth variant="contained" color='primary' component={Link} to="/dashboard/payment">Comece agora</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Container>
      </div>
    );
}

export default Subscription;
