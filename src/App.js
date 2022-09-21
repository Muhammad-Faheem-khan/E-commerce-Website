import { data } from 'jquery'
import React, {useState, useEffect}  from 'react'
import NavBar from './Components/NavBar/NavBar'
import Products from './Components/Products/Products'
import {commerce} from './lib/commerce'


const App = () => {
  const [products, setproducts] = useState([])
  const [cart, setcart] = useState('')

  
  const fetchproduct = async ()=> {
    const { data } = await commerce.products.list();

    setproducts(data)
  }

  const fetchCart = async ()=> {
    setcart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) =>{
    const items = await commerce.cart.add(productId, quantity)

    setcart(items.cart)
  }


  useEffect(()=>{
    fetchproduct();
    fetchCart();
  }, [])

  console.log(cart)
  return (
    <div>
        <NavBar />
        <Products products={products} onAddToCart = {handleAddToCart}/>
    </div>
  )
}

export default App
