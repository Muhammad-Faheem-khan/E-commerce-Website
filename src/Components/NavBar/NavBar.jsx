import React from 'react'
import { AppBar, Toolbar, IconButton, Badge,  MenuItem, Menu } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import {  ShoppingCart } from '@material-ui/icons'
import logo from './logo.jpg'
import useStyles from './styles'


const NavBar=()=>{
    const classes = useStyles();

    return(
        <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit' >
                        <img src={logo} alt='Commerce.js' height='25px' className={classes.image} />
                        E-commerce Store
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label='Show Cart items' color='inherit'>
                            <Badge overlap="rectangular" badgeContent={2} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default NavBar;