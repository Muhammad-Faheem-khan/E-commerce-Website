import React from "react";
import {Card, CardContent, CardActions, Typography} from '@material-ui/core'
import { IconButton, CardMedia } from '@material-ui/core';
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from './style'


const Product=({ product, onAddToCart })=>{
    const classes = useStyles();
    return(
        <Card className={classes.root}>
        <CardMedia className = {classes.media} image={product.image.url} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5" >
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary" />
                   
               
        </CardContent>
        <CardActions disableSpacing className={classes.cardactions}>
            <IconButton aria-label="Add to Cart" onClick={()=> onAddToCart(product.id, 1)}>
           
                <AddShoppingCart />
            </IconButton>
        </CardActions>

        </Card>
         
    )
}


export default Product;