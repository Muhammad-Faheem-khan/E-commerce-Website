import React, {useState, useEffect} from 'react'
import {Grid, Button, MenuItem, Typography, Select,  InputLabel, Input} from '@material-ui/core'
import {Link} from 'react-router-dom'

const AddressForm = ({checkoutToken, dataCollector, shippingProvince, setshippingProvince,setshippingCity, 
    shippingCities, shippingCity, provinceList}) => {

    
const handleInfo=(e)=>{
    e.preventDefault()
    const data1 =
        {Province: shippingProvince,
            City_Selected: shippingCity,
            line_items: checkoutToken.line_items,
            firstName: e.target.fname.value,
        lastName: e.target.lname.value,
        address: e.target.address.value,
        email: e.target.email.value,
        zip: e.target.zip.value,
        city_Entered: e.target.city.value
    }
    console.log(data1)
    dataCollector(data1)
}
let city='';
let province='';




  return (
    <>
        <Typography variant='h6' gutterBottom align='center'>Shipping Address</Typography>
       
            <form onSubmit= { handleInfo}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <Input name='fname' type='text' required  placeholder='First Name*'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Input name='lname' type='text' required  placeholder='Last Name*'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Input name='address' type='text' required  placeholder='Address*'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Input name='email' type='text' required  placeholder='email Id*'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Input name='city' type='text' required  placeholder='City*'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Input name='zip' type='text' required placeholder='ZIP/Postal Address*'/>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Province</InputLabel>
                        <Select  value={shippingProvince} required fullWidth onChange={(e)=> setshippingProvince(e.target.value  )
                        }>
                            {provinceList.map((province)=>(
                                <MenuItem key={province} value={province}>
                                {province}
                                </MenuItem>
                            ))}
                        </Select>
                        </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Cities</InputLabel>
                        <Select  value = {shippingCity} required fullWidth onChange={(e)=>  setshippingCity(e.target.value )
                       
                        }>
                            {shippingCities.map((city)=> 
                            <MenuItem key={city} value={city }>
                                {city}
                            </MenuItem>)}
                        </Select>
                    </Grid>
                  
                </Grid>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant='outlined' component={Link} to='/cart'>Back to Cart</Button>
                    <Button variant='contained' type='submit' color="primary">Next</Button>
                </div>
            </form>
    </>
  )
}

export default AddressForm
