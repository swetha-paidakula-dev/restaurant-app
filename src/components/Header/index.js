import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <h1 className="logo-heading">{restaurantName}</h1>
        </Link>

        <div className="nav-menu">
          <p className="my-orders-text">My Orders</p>

          <Link to="/cart" className="cart-link">
            <div className="cart-icon-container" data-testid="cart">
              <AiOutlineShoppingCart className="cart-icon" />
              <span className="cart-badge" data-testid="cart-count">
                {cartList.length}
              </span>
            </div>
          </Link>

          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout <FiLogOut />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)