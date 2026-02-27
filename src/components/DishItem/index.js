import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails} = props
  const {addCartItem} = useContext(CartContext)

  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishImage,
    addonCat,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)

  const onIncrease = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecrease = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const onAddToCart = () => {
    const cartItem = {
      dishId,
      dishName,
      dishPrice,
      dishCurrency,
      quantity,
    }
    addCartItem(cartItem)
  }

  return (
    <li>
      <h1>{dishName}</h1>
      <p>
        {dishCurrency} {dishPrice}
      </p>
      <p>{dishDescription}</p>
      <p>{dishCalories} calories</p>

      {dishAvailability === false && <p>Not available</p>}

      {dishAvailability !== false && (
        <>
          <button type="button" onClick={onDecrease}>
            -
          </button>

          <p>{quantity}</p>

          <button type="button" onClick={onIncrease}>
            +
          </button>

          {quantity > 0 && (
            <button type="button" onClick={onAddToCart}>
              ADD TO CART
            </button>
          )}
        </>
      )}

      {addonCat.length > 0 && <p>Customizations available</p>}

      <img src={dishImage} alt={dishName} />
    </li>
  )
}

export default DishItem