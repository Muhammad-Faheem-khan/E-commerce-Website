import React, {useState, useEffect} from 'react'
import {Grid, Button, MenuItem, Typography, Select,  InputLabel, Input} from '@material-ui/core'
import { commerce } from '../../lib/commerce'
import {Link} from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'




const AddressForm = ({checkoutToken, dataCollector}) => {

const [shippingCountries, setshippingCountries] = useState([])
const [shippingCountry, setshippingCountry] = useState('')
const [shippingSubdivisions, setshippingSubdivisions] = useState([])
const [shippingSubdivision, setshippingSubdivision] = useState('')


const countries = Object.entries(shippingCountries).map(([code, name])=> ({ id: code, label:name}))
const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=> ({ id: code, label:name})) 

const fetchCountries= async (checkoutTokenId) =>{
    const response = await commerce.services.localeListShippingCountries(checkoutTokenId)
    setshippingCountries(response.countries)
    setshippingCountry(Object.keys(shippingCountries)[0])
}

const fetchSubdivisions= async (checkoutTokenId, countryCode) =>{
    const response = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode)
    setshippingSubdivisions(response.subdivisions)
    setshippingSubdivision(Object.keys(shippingSubdivisions)[0])
}

useEffect(()=>{
    fetchCountries(checkoutToken.id)
}, [])

useEffect(()=>{
   if(shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry)
}, [shippingCountry])

const handleInfo=(e)=>{
    e.preventDefault()
    const data1 =
        {subdivision: shippingSubdivision,
            line_items: checkoutToken.line_items,
            firstName: e.target.fname.value,
        lastName: e.target.lname.value,
        address: e.target.address.value,
        email: e.target.email.value,
        zip: e.target.zip.value,
        city: e.target.city.value
    }
    
    dataCollector(data1)
    e.target.reset();
}




  return (
    <>
        <Typography variant='h6' gutterBottom align='center'>Shipping Address</Typography>
       
            <form onSubmit= {(e)=>{ handleInfo(e)} }>
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
                        <InputLabel>Shipping Country</InputLabel>
                        <Select defaultValue="" required fullWidth onChange={(e)=> setshippingCountry(e.target.value)}>
                            {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                        </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select defaultValue="" required fullWidth onChange={(e)=> setshippingSubdivision(e.target.value)}>
                            {subdivisions.map((subdivision)=> 
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
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
