import React, {useState, useEffect} from 'react'
import {Grid, Button, MenuItem, Typography, Select, TextField, InputLabel} from '@material-ui/core'
import { commerce } from '../../lib/commerce'
import {Link} from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'




const AddressForm = ({checkoutToken, next}) => {
const [shippingCountries, setshippingCountries] = useState([])
const [shippingCountry, setshippingCountry] = useState('')
const [shippingSubdivisions, setshippingSubdivisions] = useState([])
const [shippingSubdivision, setshippingSubdivision] = useState('')
const [shippingOptions, setshippingOptions] = useState([])
const [shippingOption, setshippingOption] = useState('')

const methods = useForm()

const countries = Object.entries(shippingCountries).map(([code, name])=> ({ id: code, label:name}))
const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=> ({ id: code, label:name})) 
const options = shippingOptions.map((o)=> ({id: o.id, label: `${o.description} - (${o.price.formatted_with_symbol})`}))

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

const fetchShippingOptions= async (checkoutTokenId, country, region) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
    setshippingOptions(options)
    setshippingOption(options[0].id)
}


useEffect(()=>{
    fetchCountries(checkoutToken.id)
}, [])

useEffect(()=>{
   if(shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry)
}, [shippingCountry])

useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
 }, [shippingSubdivision])

  return (
    <>
        <Typography variant='h6' gutterBottom align='center'>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit= {methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <TextField name='fname' required variant='standard' label='First Name'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name='lname' required variant='standard' label='Last Name'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name='address' required variant='standard' label='Address'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name='email' required variant='standard' label='email Id'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name='city' required variant='standard' label='City'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name='zip' required variant='standard' label='ZIP/Postal Address'/>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e)=> setshippingCountry(e.target.value)}>
                            {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                        </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e)=> setshippingSubdivision(e.target.value)}>
                            {subdivisions.map((subdivision)=> 
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </MenuItem>)}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Option</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e)=> setshippingOptions(e.target.value)}>
                            {options.map((option)=> 
                                <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                            )}
                            
                        </Select>
                    </Grid>
                </Grid>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant='outlined' component={Link} to='/cart'>Back to Cart</Button>
                    <Button variant='contained' type='submit' color="primary">Next</Button>
                </div>
            </form>
            </FormProvider>
    </>
  )
}

export default AddressForm
