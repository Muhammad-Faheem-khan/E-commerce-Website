import React from 'react'
import {container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './style'
import CartItems from './CartItems/CartItems'

const Cart = ({cart}) => {
    const classes = useStyles();
    const isEmpty = !cart.total_items

    const EmptyCart = () => (
        <Typography variant='subtitle1'>Your cart is empty, start adding items.</Typography>
    );
    const FilledCart =() =>(

        <div className= {classes.container}>
            <Typography className={classes.heading} variant='h4'>Your Shopping Cart</Typography>
            <Grid container  spacing={3}>
                { cart.line_items.map((item)=> (
                    <Grid item xs={12} sm={4} key={item.id}>
                    <CartItems item={item}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            </div>
            <div>
                <Button variant='contained' size='large' type='button' className={classes.emptyButton} color='secondary' >Empty Cart</Button>
                <Button variant='contained' size='large' type='button' className={classes.checkoutButton} color='primary' >Checkout</Button>
            </div>
        </div>
    )

    if(!cart.total_items) return 'Loading...'

  return (
    <div className={classes.toolbar}>
    <Typography variant='h3' className={classes.titlr}> Your Shopping Cart</Typography>
      { isEmpty ? <EmptyCart /> : <FilledCart />}
    </div>
  )
}

export default Cart
