import React from 'react'
import useStyle from './style'
import {Card, CardContent, CardActions, Typography} from '@material-ui/core'
import { Button, CardMedia } from '@material-ui/core';

const CartItems = ({ item, onClickUpdate, onClickRemove }) => {
    const classes = useStyle();
  return (
    <>
      <Card>
        <CardMedia className = {classes.media} image={item.image.url} alt={item.name} />
            <CardContent className={classes.cardContent} >
                <Typography variant="h5" gutterBottom>{item.name}</Typography>
                <Typography variant="h6" >{item.price.formatted_with_symbol}</Typography>
            </CardContent>

        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
            <Button type='button' size='small' onClick={()=> onClickUpdate(item.id, item.quantity - 1)}>-</Button>
            <Typography>{item.quantity}</Typography>
            <Button type='button' size='small' onClick={()=>onClickUpdate(item.id, item.quantity + 1)}>+</Button>
            </div>
            <Button variant='contained' type='button' color='secondary' onClick={() => onClickRemove(item.id)}>Remove</Button>
        </CardActions>

        </Card>
    </>
  )
}

export default CartItems
