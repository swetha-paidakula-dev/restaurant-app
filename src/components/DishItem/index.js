import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = ({dishDetails}) => {
  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncrease = () => setQuantity(prev => prev + 1)
  const onDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0))
  const onAddToCart = () => {
    if (quantity > 0) {
      addCartItem({...dishDetails, quantity})
      setQuantity(0)
    }
  }

  return (
    <li className='modern-dish-card'>
      <div className='dish-info'>
        <div
          className={`type-badge ${
            dishDetails.dishType === 1 ? 'non-veg' : 'veg'
          }`}
        >
          <div className='type-dot' />
        </div>

        <h1 className='modern-dish-name'>{dishDetails.dishName}</h1>
        <p className='modern-dish-price'>
          {dishDetails.dishCurrency} {dishDetails.dishPrice}
        </p>
        <p className='modern-dish-desc'>{dishDetails.dishDescription}</p>
        <p>{dishDetails.dishCalories} calories</p>

        {dishDetails.dishAvailability ? (
          <div className='action-area'>
            <div className='modern-controller'>
              <button type='button' onClick={onDecrease}>
                -
              </button>
              <p>{quantity}</p>
              <button type='button' onClick={onIncrease}>
                +
              </button>
            </div>
            {quantity > 0 && (
              <button
                type='button'
                className='modern-add-btn'
                onClick={onAddToCart}
              >
                ADD TO CART
              </button>
            )}
          </div>
        ) : (
          <p>Not available</p>
        )}

        {dishDetails.addonCat.length > 0 && <p>Customizations available</p>}
      </div>

      <div className='dish-visuals'>
        <img
          className='modern-dish-img'
          alt={dishDetails.dishName}
          src={dishDetails.dishImage}
        />
      </div>
    </li>
  )
}

export default DishItem
