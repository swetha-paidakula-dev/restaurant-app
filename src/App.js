import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import Home from './components/Home'
import CartRoute from './components/CartRoute'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    setCartList(prevList => {
      const itemExists = prevList.find(each => each.dishId === dish.dishId)

      if (itemExists) {
        return prevList.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + dish.quantity}
            : each,
        )
      }

      return [...prevList, dish]
    })
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevList =>
      prevList.map(each =>
        each.dishId === dishId ? {...each, quantity: each.quantity + 1} : each,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevList =>
      prevList
        .map(each =>
          each.dishId === dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        )
        .filter(each => each.quantity > 0),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/cart' component={CartRoute} />
        <Redirect to='/login' />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
