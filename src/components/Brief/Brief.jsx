import { useCart } from "../../context/CartContext"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"

const PLACEHOLDER = "https://placehold.co/200x200/1a1a1a/C6A55C?text=🐾"
const fmt = (n) => `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`

const Brief = () => {
  const { cart, totalPrice } = useCart()
  const handleImgError = (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER }

  return (
    <Box>
      {cart.map(item => (
        <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Avatar variant="rounded" src={item.img || PLACEHOLDER} alt={item.name} imgProps={{ onError: handleImgError }} sx={{ width: 48, height: 48, borderRadius: 1.5 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3, color: "rgba(255,255,255,0.8)" }}>{item.name}</Typography>
            <Typography variant="caption" color="text.secondary">x{item.quantity}</Typography>
          </Box>
          <Typography variant="body2" fontWeight={600} color="primary.main">{fmt(item.price * item.quantity)}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 1.5, borderColor: "rgba(198,165,92,0.1)" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600}>Total</Typography>
        <Typography variant="h6" fontWeight={800} color="primary.main">{fmt(totalPrice)}</Typography>
      </Box>
    </Box>
  )
}

export default Brief
