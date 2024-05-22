import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalPrice = 0
      cartList.map(each => {
        totalPrice += each.quantity * each.price
        return null
      })

      return (
        <div className="totalPrice-cont">
          <h1 className="totalPrice-heading">
            Order Total:{' '}
            <span className="totalPrice-span">Rs {totalPrice}/-</span>
          </h1>
          <p className="totalPrice-para">{cartList.length} Items in cart</p>
          <button className="totalPrice-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
