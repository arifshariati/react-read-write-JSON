import React, { useState } from 'react';
import Axios from 'axios';

// MUI 
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Grid, Typography } from '@material-ui/core';

// const URI = "http://localhost:5000";
const URI = "https://react-read-write-json.herokuapp.com";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', 
        flexDirection:'column',
        padding:'1rem'
    }
}));


const AddFile = () => {
    const classes = useStyles();

    const [fileName, setFileName]=useState("");
    const [name, setName]=useState("");
    const [surname, setSurName]=useState("");


    const handleSubmit = () => {
        
        let data = {
            name,
            surname
        };
        Axios.post(`${URI}/writeJSON/${fileName}.json`,data)
            .then((res) => {
                if(res.status === 400){
                    console.log('Error');
                }
                setFileName("");
                setName("");
                setSurName("");
            })
            .catch((err) => {
                console.log(err);
                setFileName("");
                setName("");
                setSurName("");
            });
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h2" component="h2" gutterBottom>
                Add Files 
            </Typography>
            <Grid container spacing={2} justify="center">
                <Grid item xl={12} xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="File Name" 
                        variant="outlined" 
                        name="fileName"
                        value={fileName}
                        fullWidth
                        required
                        onChange={(e)=>setFileName(e.target.value)}
                    />
                </Grid>

                <Grid item xl={12} xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        value={name}
                        fullWidth
                        required
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Grid>

                <Grid item xl={12} xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="Sur Name" 
                        variant="outlined"
                        value={surname}
                        fullWidth
                        required
                        onChange={(e)=>setSurName(e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit} >
                        Add File
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AddFile;
