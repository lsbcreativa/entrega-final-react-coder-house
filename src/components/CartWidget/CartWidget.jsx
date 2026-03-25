// CartWidget — Icono del carrito con badge que muestra la cantidad de productos
// Se muestra siempre en el NavBar, con o sin productos
import { Link } from "react-router-dom"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import { useCart } from "../../context/CartContext"

const CartWidget = () => {
  // Obtenemos la cantidad total de productos del contexto del carrito
  const { totalQuantity } = useCart()

  return (
    // Al hacer clic, navega a la vista del carrito
    // El badge muestra la cantidad; si es 0, no muestra número (showZero: false)
    <IconButton component={Link} to="/cart" sx={{ color: "primary.main" }}>
      <Badge badgeContent={totalQuantity || 0} color="primary" overlap="rectangular" showZero={false}>
        <ShoppingBagOutlinedIcon />
      </Badge>
    </IconButton>
  )
}

export default CartWidget
