import React from 'react';
import 'fontsource-roboto';
import './App.css';
import { Routes } from './Routes';
import { SnackbarProvider } from 'notistack'

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}} hideIconVariant>
        <Routes/>
    </SnackbarProvider>
    );
};
