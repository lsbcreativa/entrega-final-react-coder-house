import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 300 }}>
      <Paper variant="outlined" sx={{ display: "flex", alignItems: "center", borderRadius: 2, overflow: "hidden", width: "fit-content", borderColor: "rgba(198,165,92,0.15)" }}>
        <IconButton onClick={() => quantity > 1 && setQuantity(q => q - 1)} disabled={quantity <= 1} sx={{ borderRadius: 0, width: 50, height: 50, color: "primary.main" }}><RemoveIcon /></IconButton>
        <Typography sx={{ width: 65, textAlign: "center", fontWeight: 700, fontSize: "1.15rem", borderLeft: "1px solid", borderRight: "1px solid", borderColor: "rgba(198,165,92,0.12)", py: 1.2 }}>{quantity}</Typography>
        <IconButton onClick={() => quantity < stock && setQuantity(q => q + 1)} disabled={quantity >= stock} sx={{ borderRadius: 0, width: 50, height: 50, color: "primary.main" }}><AddIcon /></IconButton>
      </Paper>
      <Button variant="contained" color="primary" size="large" startIcon={<AddShoppingCartIcon />} onClick={() => onAdd(quantity)} sx={{ py: 1.5, fontSize: "0.95rem" }}>
        Agregar al carrito
      </Button>
    </Box>
  )
}

export default ItemCount
