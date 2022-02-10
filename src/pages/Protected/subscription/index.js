import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Container, Card, CardHeader, CardContent, CardActions, Button} from '@material-ui/core';
import Star from '@material-ui/icons/StarOutline';
import { Styles } from './subscription.elements';

const tiers = [
  {
    title: 'Anual',
    price: '500',
    description: "Cobrando R$500 numa única vez e que pode ser parcelado em até 3x no cartão crédito sem juros.",
    buttonText: 'Começar agora',
    buttonVariant: 'contained',
    link: '/dashboard/payment/2'
  },
  {
    title: 'Mensal',
    price: '50',
    description: "Cancele a qualquer momento e volte para o plano básico sem perder o plano de fidelidade.",
    buttonText: 'Começar agora',
    buttonVariant: 'outlined',
    link: '/dashboard/payment/1'
  },
];

const Subscription = () => {
    const classes = Styles();

    return (
      <div>
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Planos
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
              Aproveite hoje mesmo, comece no plano básico e terá gratuidade vitalícia. E no plano PRO com desconto de R$100,00 em anuidade.
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={12} md={6}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Anual' && <Star/>}
                    className={classes.cardHeader}/>
                  <CardContent className={classes.cardContent}>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        R${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        {tier.title === 'Anual' ?  "/anual" : "/mensal"}
                      </Typography>
                    </div>
                    <Typography variant="subtitle1" align="center">
                      {tier.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={tier.link} fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
}

export default Subscription;
