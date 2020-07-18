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

const Login = (props) => {
    const [login, setLogin] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    const {navbar, setUserLogIn} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push(dashboardRoute);
    }

    const classes = useStyles();
    
    const handleChange = (event) => {
        setLogin({...login, [event.target.id]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setLogin({...login, showPassword: !login.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(authRoute.login, {Email: login.email,Password: login.password})
            .then(res => {
                let data = res.data?.data;
                setCookie(AxiosConstant.token, data?.token,  data?.expireDate) 
                setUserLogIn(true, data?.firstName, data?.lastName);
                toast.success(authMessages.login.success.format(`${data?.firstName} ${data?.lastName}`));
                props.history.push(dashboardRoute);
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
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} >
                         
                        <TextField autoFocus variant="outlined" type="email" margin="normal" required fullWidth id="email" label="Email Address"
                            onChange={handleChange} placeholder="Enter Your User Name" />
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <OutlinedInput variant="outlined" onChange={handleChange} required fullWidth name="password" label="Password"
                                id="password" autoComplete="current-password" type={login.showPassword ? 'text' : 'password'} value={login.password}
                                placeholder="Enter Your Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} edge="end" >
                                            {login.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } labelWidth={80} />
                        </FormControl>
                        <FormControlLabel control={
                            <Checkbox value="remember" color="primary" />
                        } label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgotpassword" variant="body2">
                                    Forgot password?
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
 
export default Login;