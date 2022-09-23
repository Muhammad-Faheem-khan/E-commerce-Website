import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import React, {useState, useEffect} from 'react'
import {commerce} from '../../../lib/commerce'
import useStyles from './style'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Cart from "../../Cart/Cart";

const Checkout = ({ cart }) => {
    const [activeStep, setactiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const classes = useStyles()
    const steps =['Shipping address', 'Payment Plan']

    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})

                console.log(token)
                setcheckoutToken(token)
            } catch (error) {
                
            }
        }

        generateToken();
},[cart])

    const Form =()=> activeStep===0 ? <AddressForm checkoutToken={checkoutToken}/> : <PaymentForm />
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
                      {  activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
    </>
  )
}

export default Checkout
