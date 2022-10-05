
import React, {useState, useEffect}  from 'react'
import Cart from './Components/Cart/Cart'
import NavBar from './Components/NavBar/NavBar'
import Products from './Components/Products/Products'
import {commerce} from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Components/CheckoutForm/Checkout/Checkout'


const App = () => {
  const [products, setproducts] = useState([])
  const [cart, setcart] = useState({})
  const [errorMsg, seterrorMsg] = useState('');

  
  const fetchproduct = async ()=> {
    const { data } = await commerce.products.list();
    setproducts(data)
  }

  const fetchCart = async ()=> {
    try{
    const cart = await commerce.cart.retrieve()
    } catch (error) {
      console.log('Something went wrong with Cart fetching')
      
  }
    setcart(cart)
  }
  console.log(cart)

  const handleAddToCart = async (productId, quantity) =>{
    try{
    setcart(await commerce.cart.add(productId, quantity))
    } catch (error) {
      console.log('Something went wrong with Products fetching')
      
  }
  }

  const handleUpdateCartQuantity = async (productId, quantity) =>{
    setcart(await commerce.cart.update(productId, {quantity}))
  }

  const handleRemoveItem = async (productId) =>{
    setcart(await commerce.cart.remove(productId))
  }

  const handleEmptyCart = async () =>{
    setcart(await commerce.cart.empty())
  }

  const refreshCart = async () =>{
    try{
    const newCart = await commerce.cart.refresh();
    setcart(newCart)} catch (error) {
      console.log('Something went wrong with Cart refresh')
      
  }
  }




  useEffect(()=>{
    fetchproduct();
    fetchCart();
  }, [])

  return (
          <Router>
            <div>
            <NavBar items={cart} />
              <Routes>
                  <Route exact path="/" element={<Products products={products} onAddToCart = {handleAddToCart}/>} />
                  <Route exact path= "/cart" element={<Cart cart={cart} 
                      onClickRemove={handleRemoveItem} 
                      onClickUpdate={handleUpdateCartQuantity} 
                      onClickEmpty={handleEmptyCart}/>} />
                  <Route exact path = '/checkout' 
                  element={<Checkout cart={cart} 
                  error={errorMsg}
                  refreshCart={refreshCart}
                  />}  />
              </Routes>
           </div>
          </Router>
  )
}

export default App
