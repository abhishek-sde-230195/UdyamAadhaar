import React,  { useState, useContext} from "react";
import {TextField, Grid, Button, Typography, Avatar, CssBaseline, FormControlLabel, InputLabel,
    Paper, Box, InputAdornment, IconButton, OutlinedInput, FormControl } from '@material-ui/core';
import {LockOutlined, VisibilityOff, Visibility} from '@material-ui/icons';
import clsx from 'clsx';
import axios from 'axios';
import Theater from  '../../media/images/theater1.jpg';
import {isTablet, isMobile, BrowserView, MobileOnlyView, TabletView} from 'react-device-detect';
import {Link} from 'react-router-dom';
import  toast from "../../axios.interceptor";
import { LoginStyle as useStyles } from '../layout/Style';
import Copyright from '../layout/CopyRight';
import { NavbarContext } from "../../context/NavbarContext";
import  {authRoute, dashboardRoute} from '../../constants/RouteConstants';
import  {authMessages} from '../../constants/MessagesConstant';

const SignUp = (props) => {
    const [signup, setSignUp] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        showPassword: false,
    })

    const {navbar} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push(dashboardRoute);
    }

    const classes = useStyles();

    const handleChange = (event) => {
        setSignUp({...signup, [event.target.id]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setSignUp({...signup, showPassword: !signup.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(authRoute.signup, {
            Email: signup.email,
            Password: signup.password,
            ConfirmPassword:signup.confirmPassword,
            FirstName: signup.firstName,
            LastName: signup.lastName
        })
        .then(() => {
            toast.success(authMessages.signup.success);
            props.history.push(authRoute.verifyAccount);
        })
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus onChange={handleChange} margin="normal" required fullWidth id="firstName" 
                                label="First Name" placeholder="Please enter your first name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" onChange={handleChange} margin="normal" required fullWidth id="lastName" label="Last Name" 
                                 placeholder="Please enter your last name"/>
                            </Grid>
                        </Grid>
                        <TextField variant="outlined" onChange={handleChange} margin="normal" required fullWidth id="email" label="Email Address" 
                            autoComplete="email" placeholder="Please enter your email address"/>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <OutlinedInput variant="outlined" onChange={handleChange} required fullWidth name="password" label="Password"
                                id="password" autoComplete="current-password" type={signup.showPassword ? 'text' : 'password'} value={signup.password}
                                placeholder="Enter Your Password" endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} edge="end" >
                                            {signup.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } labelWidth={80} />
                        </FormControl>
                        <TextField variant="outlined" margin="normal" onChange={handleChange} required fullWidth id="confirmPassword" name="confirmPassword" label="Confirm Password"
                            type="password" autoComplete="current-password" placeholder="Please confirm password" />
                        <Button type="submit" fullWidth  variant="contained" color="primary" className={classes.submit}>
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgotpassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    {"Already have an account? Sign in"}
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
 
export default SignUp;