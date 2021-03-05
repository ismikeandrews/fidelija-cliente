import React from 'react';
import clsx from 'clsx';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Chart } from './components';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  
  const Home = () => {
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div>
            <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Card title="Usuarios" content="500" text="150"/>
              </Paper>
            </Grid>
            {/* Recent Card */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Card title="Valor arrecadado" content="R$ 3.300,00" text="R$ 1.500,00"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Card title="Pontos concedidos" content="8000" text="1000"/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Chart />
              </Paper>
            </Grid>
          </Grid>
        </div>
        
    )
}

export default Home;
