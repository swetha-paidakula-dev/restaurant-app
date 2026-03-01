import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [menuList, setMenuList] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {setRestaurantName, addCartItem} = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()

      const updatedData = data[0].table_menu_list.map(menu => ({
        menuCategory: menu.menu_category,
        menuCategoryId: menu.menu_category_id,
        menuCategoryImage: menu.menu_category_image,
        categoryDishes: menu.category_dishes.map(dish => ({
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishImage: dish.dish_image,
          dishCurrency: dish.dish_currency,
          dishCalories: dish.dish_calories,
          dishDescription: dish.dish_description,
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          addonCat: dish.addonCat,
          quantity: 0,
        })),
      }))

      setMenuList(updatedData)
      setActiveCategoryId(updatedData[0].menuCategoryId)
      setRestaurantName(data[0].restaurant_name)
      setIsLoading(false)
    }

    fetchData()
  }, [setRestaurantName])

  const renderTabs = () =>
    menuList.map(menu => {
      const isSelected = menu.menuCategoryId === activeCategoryId
      return (
        <li
          key={menu.menuCategoryId}
          className={`each-tab-item ${isSelected ? 'active-tab-item' : ''}`}
        >
          <button
            type="button"
            className="tab-category-button"
            onClick={() => setActiveCategoryId(menu.menuCategoryId)}
          >
            {menu.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const activeCategory = menuList.find(
      menu => menu.menuCategoryId === activeCategoryId,
    )
    if (!activeCategory) return null

    return (
      <ul className="dishes-list-container">
        {activeCategory.categoryDishes.map(dish => (
          <DishItem key={dish.dishId} dishDetails={dish} />
        ))}
      </ul>
    )
  }

  return (
    <div className="home-background">
      <Header />
      {isLoading ? (
        <div className="spinner-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      ) : (
        <>
          <ul className="tab-container">{renderTabs()}</ul>
          {renderDishes()}
        </>
      )}
    </div>
  )
}

export default Home