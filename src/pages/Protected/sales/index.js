import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Link as MuiLink, Breadcrumbs } from '@material-ui/core';
import { Styles } from './styles';
import NavigateNext from '@material-ui/icons/NavigateNext'
const Sales = () => {
  const classes = Styles();

  return (
      <div className={classes.header}>
        <div>
          <Typography variant="h5">
              Minhas Promoções
          </Typography>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
              <MuiLink color="inherit" component={Link} to="/">
                  Home
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="#">
                  Promoções
              </MuiLink>
          </Breadcrumbs>
          </div>
      </div>
  )
}

export default Sales