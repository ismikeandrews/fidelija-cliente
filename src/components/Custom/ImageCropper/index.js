import React, { useState, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import {
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
    IconButton,
    DialogContent,
    Grid,
    Button,
    Slider
} from '@material-ui/core';
import { Close, RotateLeft, RotateRight } from '@material-ui/icons';
import getCroppedImg from './imageCropper';
import { Styles } from './ImageCropper.elements';

const ImageCropper = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedImage, setCroppedImage] = useState(null);
    const classes = Styles();

    const handleImage = async () => {
        handleDialogClose()
        try {
            const cropped = await getCroppedImg(props.url, croppedImage, rotation)
            fetch(cropped)
                .then(res => res.blob())
                .then(async (blob) => {
                    props.handleChange(blob);
                });
          } catch (error) {
            console.log(error)
            setZoom(1)
            setRotation(0)
          }
    }

    const handleDialogClose = () => {
        setZoom(1);
        setRotation(0); 
        props.close()
    }

    return (
        <Dialog open={props.open} onClose={props.close} maxWidth="lg">
            <div>
                <DialogTitle>Cortar imagem</DialogTitle>
                <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
                    <Close />
                </IconButton>
            </div>
            
            <DialogContent>
                <div className={classes.cropArea}>
                    <Cropper
                    objectFit="contain"
                    image={props.url}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={10 / 10}
                    onCropChange={setCrop}
                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedImage(croppedAreaPixels)}
                    onZoomChange={setZoom}/>
                </div>
            </DialogContent>
            <DialogActions className={classes.slider}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rotationButtons}>
                        <IconButton color="primary" onClick={() => setRotation(rotation - 90)}>
                            <RotateLeft/>
                        </IconButton>
                        <IconButton color="primary" onClick={() => setRotation(rotation + 90)}>
                            <RotateRight/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>     
                        <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" onChange={(e, zoom) => setZoom(zoom)} classes={{ root: 'slider' }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleImage}>Salvar</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default ImageCropper
