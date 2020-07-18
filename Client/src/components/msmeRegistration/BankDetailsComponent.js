import React,  { useState} from "react";
import {TextField, FormControl, Grid, Button} from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from '../layout/Style';

const BankDetailsComponent = (props) => {
    const [bankDetails, setBankDetails] = useState({
        bankAccountNumber: '',
        bankIfscCode: ''
    })
    
    const {activeStep,  handleBack, maxLength, handleNext} = props
    console.log(maxLength)
    const classes = useStyles();

    const handleChange = () => (event) => {
        console.log(event);
        setBankDetails({...bankDetails, [event.target.id]: event.target.value });
        console.log(bankDetails)
    };
    
    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(bankDetails);
        handleNext(bankDetails, 3);
    }

    return (
            <form onSubmit={handleSubmit}>
                <Grid  container className="text-align-center grid-class" justify="center"  alignItems="center" spacing={3}>
                    
                    <Grid  item xs={12} sm={12} md={12}>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="bankAccountNumber" label="Bank Account Number" variant="outlined" value={bankDetails.bankAccountNumber}
                                    onChange={handleChange()} placeholder="Please enter the Bank account number of the Firm/ Organization/ Company" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="bankIfscCode" label="Bank IFSC Code" variant="outlined" value={bankDetails.bankIfscCode}
                                    onChange={handleChange()} placeholder="Please enter the IFSC Code of your Bank" />
                                </FormControl>
                            </Grid>
                        </Grid> 
                    </Grid>            
                </Grid>
                <div className={classes.actionsContainer}>
                    <div>
                        <Button  disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            {activeStep === maxLength - 1 ? 'Register MSME' : 'Next'}
                        </Button>
                    </div>
                </div>
            </form>
    );
}
 
export default BankDetailsComponent;