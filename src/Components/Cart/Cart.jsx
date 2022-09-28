import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './style'
import CartItems from './CartItems/CartItems'
import {Link} from 'react-router-dom'

const Cart = ({cart, onClickRemove, onClickUpdate, onClickEmpty}) => {
    const classes = useStyles();
    const isEmpty = !cart.total_items

    const EmptyCart = () => (
        <Typography variant='subtitle1'> You have no items in your Cart,
        <Link to = "/" className= {classes.link}> Start adding items</Link>!
        </Typography>
    )
    const FilledCart =() =>(

        <>
        
            <Grid container  spacing={3}>
                { cart.line_items.map((item)=> (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <CartItems item={item} onClickRemove={onClickRemove} onClickUpdate={onClickUpdate} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            </div>
            <div>
                <Button variant='contained' size='large' type='button' className={classes.emptyButton} color='secondary' onClick = {()=> onClickEmpty()}>Empty Cart</Button>
                <Button component={Link} to='/checkout' variant='contained' size='large' type='button' className={classes.checkoutButton} color='primary'>Checkout</Button>
            </div>
            
        </>
    )

  return (
    
    <div className={classes.toolbar } >

    <Typography variant='h3' align='center' gutterBottom className={classes.title}> Your Shopping Cart</Typography>
    <div className={classes.container}>
      { isEmpty ? <EmptyCart /> : <FilledCart />}
    </div>
    </div>
  )
}

export default Cart
