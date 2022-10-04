import { Paper, Stepper, Step, StepLabel, Typography, } from "@material-ui/core";
import React, {useState, useEffect} from 'react'
import {commerce} from '../../../lib/commerce'
import useStyles from './style'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "./Confirmation";
import { send } from "emailjs-com";

const Checkout = ({ cart, error, refreshCart }) => {
    const [activeStep, setactiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState({});
    const [shippingData, setshippingData] = useState({});
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
      });
    const classes = useStyles()
    const steps =['Shipping address', 'Payment Plan']
    const [shippingProvince, setshippingProvince] = useState('')
    const [shippingCities, setshippingCities] = useState([])
    const [shippingCity, setshippingCity] = useState([])

    const provinceList = ['Punjab', 'Sindh', 'Khyber_Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory']
    const citiesList = [ [ 'Lahore', 'Rawalpindi', 'faislabad', 'Kasoor', 'Sialkot'],
                         ['Karachi', 'Larkana', 'hyderabad', 'Sukkur'],
                         ['Peshawar', 'Mardan', 'Mingora', 'Sawabi'],
                         ['Quetta', 'Hub', 'Turbat', 'Khuzdar'], ['Main City'] ]
                        
    

     useEffect(()=>{
     if(shippingProvince) 
        {
        setshippingCities(citiesList[provinceList.indexOf(shippingProvince)])
         console.log(shippingCities)
                        }},[shippingProvince])
                        

    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
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
            nextStep()
    }

    useEffect(()=>{
        if(shippingData){
            setToSend({
                from_name: 'E-store',
                to_name: shippingData.firstName + " " +shippingData.lastName,
                message: `We have recieved your order of ${cart.line_items.map((item)=>  ` \n item.name \n` )}. Hopefully, 
                it will deliver soon. Your total bill is: &{cart.subtotal.formatted_with_symbol}`,
                reply_to: shippingData.email, 
              });
    }},[shippingData])

    const handleEmail = ()=>{
        
            send(
                'service_mccmppa',
                'template_o8sydes',
                toSend,
                'wkTYtQrtm_A1S5BZN'
              ).then((response) => {
                  console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                  console.log('FAILED...', err);
                })}

    const Form =()=> activeStep===0 ? <AddressForm checkoutToken={checkoutToken}  
    shippingProvince={shippingProvince}
    setshippingProvince={setshippingProvince}
    shippingCities={shippingCities}
    shippingCity={shippingCity}
    setshippingCity={setshippingCity}
    provinceList={provinceList}
    dataCollector={next} />
     : <PaymentForm checkoutToken={checkoutToken}
     refreshCart={refreshCart}
     backStep={backStep} 
     nextStep={nextStep}
     cart={cart}
     handleEmail={handleEmail}
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
                      {  activeStep === steps.length ? <Confirmation error={error} /> :  checkoutToken && <Form />}
                </Paper>
            </main>
    </>
  )
}

export default Checkout
