import {useContext} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName, history} = props
  const {cartList} = useContext(CartContext)

  const cartCount = cartList.reduce(
    (total, eachItem) => total + eachItem.quantity,
    0,
  )

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const goToCart = () => {
    history.push('/cart')
  }

  return (
    <nav>
      <Link to="/">
        <h1>{restaurantName}</h1>
      </Link>

      <p>My Orders</p>

      <button type="button" data-testid="cart" onClick={goToCart}>
        Cart {cartCount}
      </button>

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)