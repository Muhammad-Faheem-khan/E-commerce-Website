import React from 'react'
import { Typography, Button, CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useStyles from './style'

const Confirmation = ({error}) => {
    let timerON = true;
    const classes = useStyles()
    const [part, setPart] = useState(0)
        setTimeout(()=> {
                      setPart(1)
              },2000)
   
            
  return (
    <>
      
        {part ===0 ?  <div className={classes.spinner}>
                  <CircularProgress />
              </div>
                 : (<div>
                  <Typography variant="h5">Thank you for your Purchase, </Typography>   
                  <br />
                  <Button variant="outlined" type="button" component={Link} to='/'>Back To Home</Button>
              </div>) }
    </>
  )
 }

export default Confirmation
