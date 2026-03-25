import { Link } from "react-router-dom"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import { useCart } from "../../context/CartContext"

const CartWidget = () => {
  const { totalQuantity } = useCart()

  return (
    <IconButton component={Link} to="/cart" sx={{ color: "primary.main" }}>
      <Badge badgeContent={totalQuantity || 0} color="primary" overlap="rectangular" showZero={false}>
        <ShoppingBagOutlinedIcon />
      </Badge>
    </IconButton>
  )
}

export default CartWidget
