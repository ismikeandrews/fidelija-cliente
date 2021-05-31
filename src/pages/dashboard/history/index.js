import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { userService } from '../../../services';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function History() {

  const classes = useStyles();

  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const res = await userService.getUserHistory();
    console.log(res.data)
    setHistoryList(res.data);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Pontos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default History;