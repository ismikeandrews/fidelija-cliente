import React, { useState } from 'react';
import { Box, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { Form, Field } from 'formik';
import { object, string } from 'yup';
import { Pcard } from './RegisterElements';
import { Footer, Header } from '../../../components';
import { addressService } from '../../../services';
import FormikStepper from './formikStepper';
import { authService } from '../../../services'

export default function Register() {
  const [streetName, setStreetName] = useState('')
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ownerName, setOwnerName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [category, setCategory] = useState('')

  const searchAddress = async (cep) => {
    try {
      const res = await addressService.getAddress(cep);
      setStreetName(res.data.logradouro);
      setNeighborhood(res.data.bairro);
      setCity(res.data.localidade);
    } catch (error) {
      console.log(error)
    }
  }

  const register = async () => {
    try {
        let res = await authService.setNewUser()
        console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header/>
      <Container> 
          <Pcard>
            <CardContent>
              <FormikStepper
              initialValues={{
                companyName: '',
                cnpj: '',
                category: '',
                ownerName: '',
                cpf: '', 
                email: '',
                password: '',
                passwordConfirm: '',
                postalcode: '',
                number: '',
                complement: '',
                }}>
                  <div label="empresa">
                    <Typography></Typography>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="companyName"  value={companyName} component={TextField} label="Nome da Empresa" onChange={(e) => setCompanyName(e.target.value)}/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="cnpj"  value={cnpj} component={TextField} label="CNPJ" onChange={(e) => setCnpj(e.target.value)}/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="category"   value={category} component={TextField} label="Categoria" onChange={(e) => setCategory(e.target.value)}/>
                    </Box>
                  </div>
                  <div>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="postalcode"  component={TextField} label="CEP" onBlur={(e) => searchAddress(e.target.value)}/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth disabled name="streetName" value={streetName} component={TextField} label="Endereço"/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth disabled name="neighborhood" value={neighborhood} component={TextField} label="Bairro"/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth disabled name="city" value={city} component={TextField} label="Cidade"/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="number"  value={number} component={TextField} label="Número" onChange={(e) => setNumber(e.target.value)}/>
                    </Box>
                    <Box paddingBottom={2}>
                      <Field fullWidth name="complement" value={complement} component={TextField} label="Complemento" onChange={(e) => setComplement(e.target.value)}/>
                    </Box>
                  </div>
              </FormikStepper>
            </CardContent>
          </Pcard>        
      </Container>
      <Footer/>
    </>
  );
}