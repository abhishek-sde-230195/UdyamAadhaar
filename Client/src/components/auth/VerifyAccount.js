import React, {useState, useContext, useEffect} from 'react';
import {Grid, Button, CssBaseline, Paper, Avatar, Typography } from '@material-ui/core';
import {PanoramaSharp} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import { NavbarContext } from '../../context/NavbarContext';
import  toast from "../../axios.interceptor";
import  {authRoute, dashboardRoute} from '../../constants/RouteConstants';
import  {authMessages} from '../../constants/MessagesConstant';
import { LoginStyle as useStyles } from '../layout/Style';

const VerifyAccount = (props) => {
    
    const classes = useStyles();
    const [message, setMessage] = useState(authMessages.verify.verificationMessage);
    const {navbar} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push(dashboardRoute);
    }
    const {setUserLogIn} = useContext(NavbarContext);
    const {userId, token} = queryString.parse(props.location.search);

    useEffect(() => {
        if(userId){
            setMessage(authMessages.verify.verifying);
            let url = authRoute.verificationLink.format(userId, encodeURIComponent(token));
            axios.get(url)
                .then(res => {
                    toast.success(authMessages.verify.verified);
                    setMessage(authMessages.verify.verified);
                    let data = res.data?.data;
                    setCookie(AxiosConstant.token, data?.token,  data?.expireDate) 
                    setUserLogIn(true, data?.firstName, data?.lastName);
                    props.history.push(dashboardRoute);
                })
                .catch(() => setMessage(authMessages.verify.verificationFailed));
        }
    },[]);

    return ( 
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={'img-login ' + classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={'text-align-center ' + classes.paper}>
                     <Avatar className={classes.avatar}>
                        <PanoramaSharp />
                    </Avatar>
                    <h3>
                    {message} 
                    <Grid>
                        <Link to='/signin' >
                            <Button type="submit" variant="outlined"   color="primary">
                                LOGIN
                            </Button>
                        </Link>
                    </Grid>
                    </h3> 
                </div>
            </Grid>
        </Grid>
     );
}
 
export default VerifyAccount;