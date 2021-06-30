import React, { useState } from 'react';
import { Box, Card, CardContent, Container, TextField, Typography, Button, Stepper, Step } from '@material-ui/core';

export default function Register(){
    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');

    return (
        <>
            <Typography variant="h4">cadastro</Typography>
            <Container>
                <Card>
                    <CardContent>
                        <form>
                            <Stepper>
                                <Step>
                                    
                                </Step>
                            </Stepper>
                            <div>    
                                <Box paddingBottom={2}>
                                    <TextField
                                    required
                                    label="Loja"
                                    variant="outlined"
                                    name="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}/>
                                </Box>
                                <Box paddingBottom={2}>
                                    <TextField
                                    required
                                    label="CNPJ"
                                    variant="outlined"
                                    name="cnpj"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}/>
                                </Box>
                            </div>
                            <div>
                            <Box paddingBottom={2}>
                                    <TextField
                                    required
                                    label="Loja"
                                    variant="outlined"
                                    name="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}/>
                                </Box>
                                <Box paddingBottom={2}>
                                    <TextField
                                    required
                                    label="CNPJ"
                                    variant="outlined"
                                    name="cnpj"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}/>
                                </Box>
                            </div>
                            <Button variant="contained" color="primary">Primary</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    )

}