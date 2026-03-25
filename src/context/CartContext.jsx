// CartContext — Contexto global para el manejo del carrito de compras
// Permite que cualquier componente acceda al carrito sin pasar props manualmente (prop drilling)
import { createContext, useState, useContext, useCallback } from "react"
import Notification from "../components/Notification/Notification"

// Creamos el contexto del carrito
const CartContext = createContext()

// Hook personalizado para acceder al carrito desde cualquier componente
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  // Estado del carrito — array de productos con su cantidad
  const [cart, setCart] = useState([])
  // Estado para las notificaciones tipo toast (mensajes emergentes)
  const [notification, setNotification] = useState(null)

  // Función para mostrar notificaciones — useCallback evita recrearla en cada render
  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type, key: Date.now() })
  }, [])

  // Agregar producto al carrito
  // Si ya existe, suma la cantidad; si no, lo agrega como nuevo
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

  // Eliminar un producto específico del carrito por su ID
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(p => p.id !== itemId))
  }

  // Vaciar todo el carrito (se usa al confirmar la compra o al presionar "Vaciar carrito")
  const clear = () => {
    setCart([])
  }

  // Verificar si un producto ya está en el carrito
  const isInCart = (itemId) => {
    return cart.some(p => p.id === itemId)
  }

  // Cantidad total de productos en el carrito (suma de todas las cantidades)
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Precio total del carrito (precio × cantidad de cada producto)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Proveemos todos los valores y funciones del carrito a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear, isInCart, totalQuantity, totalPrice }}>
      {children}
      {/* Notificación flotante — se muestra al agregar productos al carrito */}
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
