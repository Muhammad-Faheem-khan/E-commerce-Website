import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import React from 'react'
import { useState } from "react";
import useStyles from './style'
import AdressForm from "../AdressForm";
import PaymentForm from "../PaymentForm";

const Checkout = () => {
    const [activeStep, setactiveStep] = useState(0);
    const classes = useStyles()
    const steps =['Shipping address', 'Payment Plan']

    const Form =()=> activeStep===0 ? <AdressForm /> : <PaymentForm />
    const Confirmation=()=>(
        <div>
            Confirmation
        </div>
    )


  return (
    <>
        <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                      {  activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
    </>
  )
}

export default Checkout
