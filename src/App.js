
import React, {useState, useEffect}  from 'react'
import Cart from './Components/Cart/Cart'
import NavBar from './Components/NavBar/NavBar'
import Products from './Components/Products/Products'
import {commerce} from './lib/commerce'


const App = () => {
  const [products, setproducts] = useState([])
  const [cart, setcart] = useState([])

  
  const fetchproduct = async ()=> {
    const { data } = await commerce.products.list();
    setproducts(data)
  }

  const fetchCart = async ()=> {
    const cart = await commerce.cart.retrieve()
    setcart(cart)
  }

  const handleAddToCart = async (productId, quantity) =>{
    setcart(await commerce.cart.add(productId, quantity))
  }


  useEffect(()=>{
    fetchproduct();
    fetchCart();
  }, [])

  console.log(cart)
  return (
    <div>
        <NavBar items={cart} />
        {/* <Products products={products} onAddToCart = {handleAddToCart}/> */}
        <Cart cart={cart}/>
    </div>
  )
}

export default App
