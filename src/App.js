
import React, {useState, useEffect}  from 'react'
import Cart from './Components/Cart/Cart'
import NavBar from './Components/NavBar/NavBar'
import Products from './Components/Products/Products'
import {commerce} from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


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

  const handleUpdateCartQuantity = async (productId, quantity) =>{
    setcart(await commerce.cart.update(productId, {quantity}))
  }

  const handleRemoveItem = async (productId) =>{
    setcart(await commerce.cart.remove(productId))
  }

  const handleEmptyCart = async () =>{
    setcart(await commerce.cart.empty())
  }


  useEffect(()=>{
    fetchproduct();
    fetchCart();
  }, [])

  console.log(cart)
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
              </Routes>
           </div>
          </Router>
  )
}

export default App
