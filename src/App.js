import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== id)
    this.setState({cartList: newList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList
      .map(each => {
        if (each.id === id) {
          if (each.quantity > 1) {
            return {...each, quantity: each.quantity - 1}
          }
          return null
        }
        return each
      })
      .filter(Boolean)
    this.setState({cartList: newList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    let isIncluded = false
    const newList = cartList.map(each => {
      if (each.id === product.id) {
        isIncluded = true
        return {...each, quantity: each.quantity + product.quantity}
      }
      return each
    })
    if (isIncluded) {
      this.setState({cartList: newList})
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
