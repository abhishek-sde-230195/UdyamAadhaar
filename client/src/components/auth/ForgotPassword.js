import React,  { useState, useContext} from "react";
import {TextField, Grid, Button, Typography, Avatar, CssBaseline, FormControlLabel, InputLabel,
    Checkbox, Paper, Box, InputAdornment, IconButton, OutlinedInput, FormControl } from '@material-ui/core';
import {LockOutlined, VisibilityOff, Visibility} from '@material-ui/icons';
import clsx from 'clsx';
import axios from 'axios';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import Theater from  '../../media/images/theater1.jpg';
import {isTablet, isMobile, BrowserView, MobileOnlyView, TabletView} from 'react-device-detect';
import {Link} from 'react-router-dom';
import {NavbarContext} from '../../context/NavbarContext';
import { LoginStyle as useStyles } from '../layout/Style';
import toast from '../../axios.interceptor';
import  {authRoute, dashboardRoute} from '../../constants/RouteConstants';
import Copyright from '../layout/CopyRight';
import  {authMessages} from '../../constants/MessagesConstant';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');

    const {navbar, setUserLogIn} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push(dashboardRoute);
    }

    const classes = useStyles();
    
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(authRoute.forgetPassword.format(email))
        .then(res => {
            toast.success(authMessages.forgetPassword.success);
        });
    }

  
    
    return ( 
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={'img-login ' + classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} >
                         
                        <TextField autoFocus variant="outlined" type="email" margin="normal" required fullWidth id="email" label="Email Address"
                            onChange={handleChange} placeholder="Enter Your User Name" />
                       
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            Send Recovery Link
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signin" variant="body2">
                                    Sign in
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
     );
}
 
export default ForgotPassword;