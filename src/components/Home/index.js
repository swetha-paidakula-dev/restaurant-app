import {useEffect, useState} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [restaurantName, setRestaurantName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()

      setRestaurantName(data[0].restaurant_name)

      const updatedData = data[0].table_menu_list.map(menu => ({
        menuCategory: menu.menu_category,
        menuCategoryId: menu.menu_category_id,
        categoryDishes: menu.category_dishes.map(dish => ({
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishCurrency: dish.dish_currency,
          dishImage: dish.dish_image,
          dishCalories: dish.dish_calories,
          dishDescription: dish.dish_description,
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          addonCat: dish.addonCat || [],
        })),
      }))

      setCategories(updatedData)

      if (updatedData.length > 0) {
        setActiveCategoryId(updatedData[0].menuCategoryId)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>

  const activeCategory = categories.find(
    each => each.menuCategoryId === activeCategoryId,
  )

  return (
    <>
      <Header restaurantName={restaurantName} />

      <ul>
        {categories.map(each => (
          <li key={each.menuCategoryId}>
            <button
              type='button'
              onClick={() => setActiveCategoryId(each.menuCategoryId)}
            >
              {each.menuCategory}
            </button>
          </li>
        ))}
      </ul>

      <ul>
        {activeCategory &&
          activeCategory.categoryDishes.map(eachDish => (
            <DishItem key={eachDish.dishId} dishDetails={eachDish} />
          ))}
      </ul>
    </>
  )
}

export default Home
