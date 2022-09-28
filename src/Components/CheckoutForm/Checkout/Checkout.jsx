import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button } from "@material-ui/core";
import React, {useState, useEffect} from 'react'
import {commerce} from '../../../lib/commerce'
import useStyles from './style'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "./Confirmation";
import Cart from "../../Cart/Cart";
import {Link} from 'react-router-dom'



const Checkout = ({ cart, error, refreshCart }) => {
    const [activeStep, setactiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState({});
    const [shippingData, setshippingData] = useState({})

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

    const nextStep=()=> setactiveStep((previousstate)=>previousstate+1)
    const backStep=()=> setactiveStep((previousstate)=>previousstate-1)
    const next =(data)=>{
            setshippingData(data)
            console.log(shippingData)
            nextStep()
    }

    const Form =()=> activeStep===0 ? <AddressForm checkoutToken={checkoutToken}  dataCollector={next} />
     : <PaymentForm checkoutToken={checkoutToken}
     refreshCart={refreshCart}
     backStep={backStep} 
     nextStep={nextStep}
     cart={cart}
     />
   
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
                      {  activeStep === steps.length ? <Confirmation error={error} /> : checkoutToken && <Form />}
                </Paper>
            </main>
    </>
  )
}

export default Checkout
