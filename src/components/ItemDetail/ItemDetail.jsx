import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import ItemCount from "../ItemCount/ItemCount"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

const PLACEHOLDER = "https://placehold.co/600x600/1a1a1a/C6A55C?text=Sin+imagen"

const ItemDetail = ({ id, name, price, img, stock, category, description }) => {
  const [quantityAdded, setQuantityAdded] = useState(0)
  const { addItem } = useCart()
  const handleOnAdd = (quantity) => { setQuantityAdded(quantity); addItem({ id, name, price, img }, quantity) }
  const handleImgError = (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER }

  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid rgba(198,165,92,0.1)" }}>
          <Box component="img" src={img || PLACEHOLDER} alt={name} onError={handleImgError} sx={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Chip label={category.toUpperCase()} size="small" sx={{ mb: 2, bgcolor: "rgba(198,165,92,0.1)", color: "primary.main", fontWeight: 700, letterSpacing: 2, border: "1px solid rgba(198,165,92,0.15)" }} />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.15, fontSize: { xs: "1.5rem", md: "2rem" } }}>{name}</Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}>{description}</Typography>
        <Divider sx={{ my: 2.5, borderColor: "rgba(198,165,92,0.1)" }} />
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, color: "primary.main", mb: 2.5, letterSpacing: "0.5px" }}>
          S/ {price.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
        </Typography>

        {stock === 0 ? (
          <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>Este producto no tiene stock disponible</Alert>
        ) : quantityAdded > 0 ? (
          <Box>
            <Alert icon={<CheckCircleOutlineIcon />} severity="success" variant="outlined" sx={{ mb: 2.5, borderRadius: 2, borderColor: "rgba(198,165,92,0.3)", color: "primary.main", "& .MuiAlert-icon": { color: "primary.main" } }}>
              ¡Producto agregado al carrito!
            </Alert>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={() => setQuantityAdded(0)}>Seguir comprando</Button>
              <Button variant="contained" color="primary" component={Link} to="/cart" startIcon={<ShoppingBagOutlinedIcon />}>Ir al carrito</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 2 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: "success.main" }} />
              <Typography variant="body2" color="text.secondary">{stock} unidades disponibles</Typography>
            </Box>
            <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default ItemDetail
