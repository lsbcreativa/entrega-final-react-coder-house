import { createContext, useState, useContext, useCallback } from "react"
import Notification from "../components/Notification/Notification"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState(null)

  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type, key: Date.now() })
  }, [])

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(prev =>
        prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      )
    } else {
      setCart(prev => [...prev, { ...item, quantity }])
    }
    showNotification(`${item.name} agregado al carrito (x${quantity})`)
  }

  const removeItem = (itemId) => {
    setCart(prev => prev.filter(p => p.id !== itemId))
  }

  const clear = () => {
    setCart([])
  }

  const isInCart = (itemId) => {
    return cart.some(p => p.id === itemId)
  }

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear, isInCart, totalQuantity, totalPrice }}>
      {children}
      {notification && (
        <Notification
          key={notification.key}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  )
}
