import React from 'react'
import {Grid, Button, MenuItem, Typography, Select, InputLabel} from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from './CustomTextField'

const AdressForm = () => {
    const methods = useForm();

  return (
    <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <FormInput required name='LastName' label='Last name' />
                    <FormInput required name='Address1' label='Address' />
                    <FormInput required name='email' label='Email' />
                    <FormInput required name='city' label='City' />
                    <FormInput required name='firstName' label='First name' />
                    <FormInput required name='zip' label='ZIP/Postal Address' />
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Slect Me
                            </MenuItem>
                        </Select>

                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Slect Me
                            </MenuItem>
                        </Select>

                        <InputLabel>Shipping Option</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Slect Me
                            </MenuItem>
                        </Select>
                    </Grid> */}
                </Grid>

            </form>
        </FormProvider>
    </>
  )
}

export default AdressForm
