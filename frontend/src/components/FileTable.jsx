import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// MUI 
import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    TextField, 
    Button, 
    Grid, 
    Typography, 
    Select, 
    MenuItem, 
    InputLabel,
    FormControl,
    TableContainer,
    Table, 
    TableHead,
    TableRow,
    TableCell,
    TableBody, 
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const URI = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', 
        flexDirection:'column',
        padding:'1rem'
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: '0.5rem'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    }
}));

const FileTable = () => {
    const classes = useStyles();
    const [files, setFiles]= useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [fileData, setFileData] = useState({});

    useEffect(() => {
        Axios.get(`${URI}/getfiles`)
        .then(res => {
            let list = res.data.data;
            setFiles(list);
            if(selectedFile === "" && files.length >0){
                setSelectedFile(files[0]);
            }
        })
        .catch(err => {
            console.log(err);
        });
    },[selectedFile]);

    useEffect(() => {

        Axios.get(`${URI}/readJSON/${selectedFile}`)
        .then(res => {
            let data = res.data.data;
            setFileData(data);
        })
        .catch(err => {
            console.log(err);
        });

    },[selectedFile]);

    const deleteFile = () => {
        Axios.post(`${URI}/removefile/${selectedFile}`)
        .then(res => {
            setSelectedFile("");
            if(selectedFile === "" && files.length >0){
                setSelectedFile(files[0]);
            }
        })
        .catch(err => {
            console.log('Error = ',err);
        });
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h2" component="h2" gutterBottom>
                Files
            </Typography>
            <Grid container spacing={2} justify="center">
                <Grid item xl={12} xs={12}>
                    
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedFile}
                        variant="outlined" 
                        fullWidth
                        onChange={(e) => setSelectedFile(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        files.map((file) => (   
                            <MenuItem value={file}>{file}</MenuItem>
                        ))
                    }
                    </Select>
                </Grid>


                {
                    selectedFile && (
                        <Grid item xl={12} xs={12}>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Sur Name</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Delete</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    <TableRow>
                                        <TableCell >{fileData.name}</TableCell>
                                        <TableCell >{fileData.surname}</TableCell>
                                        <TableCell >
                                            <IconButton color="secondary" onClick={deleteFile}>
                                                <DeleteIcon />
                                            </IconButton>
                                            </TableCell>
                                    </TableRow>

                                    </TableBody>
                                </Table>

                            </TableContainer>
                        </Grid>
                    )
                }
            </Grid>
        </Paper>
    )
}

export default FileTable;
