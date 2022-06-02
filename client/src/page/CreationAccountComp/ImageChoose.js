import React, { useRef, useState } from "react";
import {
    Button,
    Box,
    Grid,
    Typography,
    Input,
    Slider,
    Modal
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AvatarEditor from 'react-avatar-editor';

function ImageChoose(props) {

    const [images, setImages] = useState(props.images ?? [null,null,null,null,null,null]);
    const [zoom, setZoom] = useState(1.2);
    const [open, setOpen] = useState(false);
    const [nb, setNb] = useState(0);
	const [image, setImage] = useState(null);
	const editor = useRef();


	const Capture = (id) => {
		if (editor.current) {
			const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL();
			var cpy = images
			cpy[id] = canvasScaled
			setImages(cpy)
			console.log(cpy)
			setImage(null)
			setOpen(false)
		  }
		  props.onChange(cpy)
    };
	const handleDelete = () => {
		var cpy = images
		if(cpy[nb]){
			cpy[nb] = null
			setImages(cpy)
			props.onChange(cpy)
		}
		setImage(null)
		setOpen(false)

	}

    const onImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(URL.createObjectURL(img));
        }
    };

    return (
		<>
			<Grid container columns={12} spacing={7} className={'Photo'}>
				<Grid item xs={12} sm={8} md={8} className={'PhotoGridTitle'}>
					<Typography variant='h5' id="demo-radio" className={'TitlePhoto'}>Photo</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={12} className={'PhotoGridButton'}>
					<Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
						<label htmlFor="contained-button-file">
							<Button variant="contained" onClick={() => {setImage(images[0] ?? null);setNb(0);setOpen(true);}} className={'ButtonPhotoPP'} component="span">{images[0]? <img style={{width:'90%', borderRadius:'999%'}} src={images[0]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
						<label htmlFor="contained-button-file1">
							<Button variant="outlined" onClick={() => {setImage(images[1] ?? null);setNb(1);setOpen(true);}} className={'ButtonPhoto'} component="span">{images[1]? <img style={{width:'90%', borderRadius:'10%'}} src={images[1]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
					</Grid>
					<Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
						<label htmlFor="contained-button-file2">
							<Button variant="outlined" onClick={() => {setImage(images[2] ?? null);setNb(2);setOpen(true);}} className={'ButtonPhoto'} component="span">{images[2]? <img style={{width:'90%', borderRadius:'10%'}} src={images[2]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
						<label htmlFor="contained-button-file3">
							<Button variant="outlined" onClick={() => {setImage(images[3] ?? null);setNb(3);setOpen(true);}} className={'ButtonPhoto'} component="span">{images[3]? <img style={{width:'90%', borderRadius:'10%'}} src={images[3]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
					</Grid>
					<Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
						<label htmlFor="contained-button-file4">
							<Button variant="outlined" onClick={() => {setImage(images[4] ?? null);setNb(4);setOpen(true);}} className={'ButtonPhoto'} component="span">{images[4]? <img style={{width:'90%', borderRadius:'10%'}} src={images[4]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
						<label htmlFor="contained-button-file5">
							<Button variant="outlined" onClick={() => {setImage(images[5] ?? null);setNb(5);setOpen(true);}} className={'ButtonPhoto'} component="span">{images[5]? <img style={{width:'90%', borderRadius:'10%'}} src={images[5]}/>: <AddIcon className={'AddIcon'} />}</Button>
						</label>
					</Grid>
				</Grid>
			</Grid>
			<Modal
			open={open}
			onClose={() => {setOpen(false); setImage(null)}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className={'ModalPhoto'}>
				<Grid sx={{marginTop:'10%', height: '80%', borderRadius:'10px'}}className={'GridModal'}>
					{image ?
					<AvatarEditor
					ref={editor}
					style={{margin: 'auto', width: '60%'}}
					image={image}
					width={400}
					height={400}
					border={50}
					borderRadius={nb === 0 ? 200 : 0}
					color={[255, 255, 255, 0.9]}
					scale={zoom}
					rotate={0}/>
					:
					<label htmlFor="contained-button-file6">
					<Input
								accept="image/*"
								id="contained-button-file6"
								multiple
								sx={{display: 'none'}}
								type="file"
								onChange={onImageUpload}
					/>
					<Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
					</label>
					}
  					<Slider sx={{margin:'auto', width:'80%'}} onChange={(va) => setZoom((va.target.value + 50) / 100)} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
					<Grid sx={{marginTop:'10%', height: '80%', borderRadius:'10px'}}className={'gridModalButtons'}>
						{image &&
						<Button
							variant="contained"
							color="error"
							onClick={handleDelete}
							sx={{ mr: 1 }}
						>
							Delete
						</Button>}
						<Button
							variant="contained"
							onClick={() => Capture(nb)}
							sx={{ mr: 1}}
						>
							Validate
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	</>
    );
}

export default ImageChoose;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
