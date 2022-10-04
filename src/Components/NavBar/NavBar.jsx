import React from 'react'
import { AppBar, Toolbar, IconButton, Badge,   } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import {  ShoppingCart } from '@material-ui/icons'
import logo from './logo.jpg'
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'


const NavBar=({items})=>{
    const classes = useStyles();
    const location = useLocation();

    return(
        <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h5' className={classes.title} color='inherit' >
                        <img src={logo} alt='Commerce.js' height='40px' className={classes.image} />
                        E-commerce Store
                    </Typography>
                    <div className={classes.grow} />
                    { location.pathname ==="/" && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label='Show Cart items' size='medium' color='inherit'>
                            <Badge overlap="rectangular" badgeContent={items.total_items} color="secondary">
                                <ShoppingCart fontSize='large'/>
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}
export default NavBar;