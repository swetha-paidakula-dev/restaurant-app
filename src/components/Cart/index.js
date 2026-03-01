import {useContext} from 'react'

import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const isCartEmpty = cartList.length === 0

  const renderEmptyView = () => (
    <div className='empty-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
        alt='empty view'
        className='empty-view-image'
      />
      <h1 className='empty-description'>Your cart is Empty.</h1>
    </div>
  )

  const renderCartItems = () => (
    <div className='cart-content-container'>
      <div className='cart-items-header'>
        <h1 className='cart-heading'>Cart Items</h1>
        <button
          type='button'
          className='remove-all-btn'
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className='cart-list'>
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
      {/* Checkout section ikkada add cheyocchu */}
    </div>
  )

  return (
    <div className='cart-page-container'>
      <Header />
      <div className='cart-body-container'>
        {isCartEmpty ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
