
import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'


const PaymentForm = ({shippingData, onCaptureCheckout, checkoutToken, nextStep, backStep}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit =  async (events, elements, stripe)=>{
    events.preventDefault();
    if(!stripe || !elements) return;
    const cardelement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card:{cardelement}});
      if(error){
        console.log(error);
      } else {
        const orderData ={
          line_items: checkoutToken.line_items,
          customer: {firstname: shippingData.fname, lastname: shippingData.lname, email: shippingData.email},
          shpping: {
            name: 'Primary',
            street: shippingData.address,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_address: shippingData.zip,
            country: shippingData.country,
          },
          fulfilment: { shipping_method: shippingData.shippingOption},
          payment: {
            gateway: 'stripe',
            stripe: {
              payment_methodId: paymentMethod.id
            }
          }

          }
          onCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
        }
        
      }

  
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{padding: '20px 0'}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe})=>(
            <form onSubmit={(e)=>handleSubmit(e, elements,stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {checkoutToken.total.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
