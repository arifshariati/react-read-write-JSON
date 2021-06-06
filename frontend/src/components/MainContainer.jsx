import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddFile, FileTable } from '.';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5rem', 
        alignContent:'center',
        alignItems: 'center'
    }
}));

const MainContainer = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify="space-around">
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <AddFile />
                </Grid>
                
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <FileTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default MainContainer;
