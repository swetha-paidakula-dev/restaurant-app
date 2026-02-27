import {useContext} from 'react'
import CartContext from '../../context/CartContext'

const CartRoute = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeAllCartItems,
  } = useContext(CartContext)

  if (cartList.length === 0) {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          alt="empty cart"
        />
      </div>
    )
  }

  return (
    <div>
      <button type="button" onClick={removeAllCartItems}>
        Remove All
      </button>

      <ul>
        {cartList.map(eachItem => (
          <li key={eachItem.dishId} data-testid="cartItem">
            <img src={eachItem.dishImage} alt={eachItem.dishName} />

            <p>{eachItem.dishName}</p>

            <button
              type="button"
              onClick={() =>
                decrementCartItemQuantity(eachItem.dishId)
              }
            >
              -
            </button>

            <p>{eachItem.quantity}</p>

            <button
              type="button"
              onClick={() =>
                incrementCartItemQuantity(eachItem.dishId)
              }
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartRoute