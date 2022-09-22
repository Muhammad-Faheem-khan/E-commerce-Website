import React from 'react'
import useStyle from './style'

import {Card, CardContent, CardActions, Typography} from '@material-ui/core'
import { IconButton, CardMedia } from '@material-ui/core';
import { AddShoppingCart } from "@material-ui/icons";

const CartItems = ({ item }) => {
    const classes = useStyle();
  return (
    <>
      <Card >
        <CardMedia className = {classes.media} image={item.image.url} title={item.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {item.name}
                </Typography>
                <Typography variant="h5" >
                    {item.price.formatted_with_symbol}
                </Typography>
            </div>
               </CardContent>

        <CardActions disableSpacing className={classes.cardactions}>
            <IconButton aria-label="Add to Cart" >
                <AddShoppingCart />
            </IconButton>
        </CardActions>
        

        </Card>
    </>
  )
}

export default CartItems
