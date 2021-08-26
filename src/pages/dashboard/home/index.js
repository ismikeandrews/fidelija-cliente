import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, RTable } from './components';
import { Line } from 'react-chartjs-2';
import { colorSchema } from "../../../components/colorSchema";

import { userService } from '../../../services';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
}));

  
const Home = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [userInfo, setUserInfo] = useState({});
  const [valuesInfo, setValuesInfo] = useState({})
  const [pointsInfo, setPointsInfo] = useState({})
  const [labels, setLabels] = useState([])

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const res = await userService.getHomeInfo();
      setUserInfo(res.data.users);
      setValuesInfo(res.data.values);
      setPointsInfo(res.data.points);
      setLabels(res.data.labels);
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div>
          <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Card title="Usuarios" content={userInfo.total} text={userInfo.today}/>
              <Line 
                  options={
                    {plugins: {
                      legend: {
                        display: false
                      }
                  }}}
                  data={{
                  labels: labels,
                  datasets: [
                    {
                      data: userInfo.history,
                      borderColor: colorSchema.lprimary,
                      fill: true,
                      backgroundColor: colorSchema.lsecondary,
                    },
                  ],
                }}/>
            </Paper>
          </Grid>
          {/* Recent Card */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Card title="Valor arrecadado" content={valuesInfo.total} text={valuesInfo.today}/>
              <Line 
                  options={
                    {plugins: {
                      legend: {
                        display: false
                      }
                  }}}
                  data={{
                  labels: labels,
                  datasets: [
                    {
                      data: valuesInfo.history,
                      borderColor: colorSchema.lprimary,
                      fill: true,
                      backgroundColor: colorSchema.lsecondary,
                    },
                  ],
                }}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Card title="Pontos concedidos" content={pointsInfo.total} text={pointsInfo.today}/>
              <Line 
                  options={
                    {plugins: {
                      legend: {
                        display: false
                      }
                  }}}
                  data={{
                  labels: labels,
                  datasets: [
                    {
                      data: pointsInfo.history,
                      borderColor: colorSchema.lprimary,
                      fill: true,
                      backgroundColor: colorSchema.lsecondary,
                    },
                  ],
                }}/>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <RTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
      
  )
}

export default Home;
