import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link'
import Title from './Title';

import { UserService } from "../../../../Services";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RTable() {

  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchHistory()
    // setInterval(() => {
    //   fetchHistory()
    // }, 20000)
  }, [])



  const fetchHistory = async () => {
    try {
      const res = await UserService.getUserHistory(1, 15)
      setHistoryList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Histórico de compras</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell align="right">Pontuação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyList.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{history.id}</TableCell>
              <TableCell>{moment(history.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
              <TableCell>{history.client}</TableCell>
              <TableCell>{history.product}</TableCell>
              <TableCell align="right">{history.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link component="a" color="primary" href="/dashboard/history">
          Ver todos
        </Link>
      </div>
    </React.Fragment>
  );
}
