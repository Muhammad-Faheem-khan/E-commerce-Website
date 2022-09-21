import React from 'react'
import {Grid} from '@material-ui/core'

import Product from './Product'


const products = [
    {id: 2, name: 'Chair', description: 'Best wooden chair', price: '$ 14', image: 'https://neufert-cdn.archdaily.net/uploads/photo/image/234787/full_zeitraum-bluechair-01-pro-b-arcit18.jpg?v=1609986931'} ,
    {id: 1, name: 'Shoes', description: 'Nike Shoes', price: '$ 10', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VKCz6El27bLgC1CxhOGSJoWcrPK3F446_A&usqp=CAU'},
]

const Products = ()=> {
    return(
    <main>
        <Grid container justiy="center" spacing={4}>
            {products.map((product)=> (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}

        </Grid>
    </main>
    )

}

export default Products