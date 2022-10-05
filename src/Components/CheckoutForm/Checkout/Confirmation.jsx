import React from 'react'
import { Typography, Button, CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useStyles from './style'

const Confirmation = () => {
    
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
                  <Typography variant="h5" align='center'>Thank you for your Purchase. </Typography>   
                  <Typography variant="h6" component='div' className={classes.confirmationText} >Hopefully, you will recieve a confirmation email soon.
                  If you wouldn't recieve email, please contact on 03095561623.</Typography>   
                  <br />
                  <Button variant="outlined" type="button" component={Link} to='/'>Back To Home</Button>
              </div>) }
    </>
  )
 }

export default Confirmation
