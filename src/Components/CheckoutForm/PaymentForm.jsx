
import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import Review from './Review'


const PaymentForm = ({checkoutToken, nextStep, refreshCart, backStep}) => {
  
  

  const handleSubmit = (events)=>{
    events.preventDefault();
    nextStep();
    refreshCart()
    

  }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{padding: '20px 0'}}>Payment Method: Cash On Delivery </Typography>
      
            <form onSubmit={(e)=>handleSubmit(e)}>
              
              <br /> <br />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained'  color='primary'>
                  Bill {checkoutToken.total.formatted_with_symbol}
                </Button>
              </div>
            </form>
          
    </>
  )
}

export default PaymentForm
