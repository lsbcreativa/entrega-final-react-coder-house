import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

const PLACEHOLDER = "https://placehold.co/200x200/1a1a1a/C6A55C?text=🐾"

const Cart = () => {
  const { cart, removeItem, clear, totalPrice, totalQuantity } = useCart()

  const handleImgError = (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER }

  if (totalQuantity === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 14 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: "primary.main", opacity: 0.2, mb: 2 }} />
          <Typography variant="h5" fontWeight={700} gutterBottom>Your cart is empty</Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
            Explore our curated collection and find the perfect products for your companion.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/" size="large" endIcon={<ArrowForwardIcon />}>
            Browse Products
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.7rem", display: "block", mb: 0.5 }}>SHOPPING BAG</Typography>
      <Typography variant="h4" fontWeight={800} gutterBottom>Your Cart</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {cart.map(item => (
              <Paper key={item.id} variant="outlined" sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, transition: "0.3s", borderColor: "rgba(255,255,255,0.04)", "&:hover": { borderColor: "rgba(198,165,92,0.2)" } }}>
                <Avatar variant="rounded" src={item.img || PLACEHOLDER} alt={item.name} imgProps={{ onError: handleImgError }} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight={600} sx={{ color: "rgba(255,255,255,0.85)" }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  <Typography sx={{ fontWeight: 700, color: "primary.main", mt: 0.25 }}>
                    ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
                <IconButton onClick={() => removeItem(item.id)} sx={{ color: "error.main", border: "1px solid rgba(248,113,113,0.2)", "&:hover": { bgcolor: "error.main", color: "#fff" } }}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(198,165,92,0.12)", position: { md: "sticky" }, top: { md: 92 } }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>ORDER SUMMARY</Typography>
            <Divider sx={{ my: 1.5, borderColor: "rgba(198,165,92,0.08)" }} />
            {cart.map(item => (
              <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "55%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name} x{item.quantity}
                </Typography>
                <Typography variant="body2" fontWeight={500}>${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2, borderColor: "rgba(198,165,92,0.08)" }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>Total</Typography>
              <Typography variant="h6" fontWeight={800} color="primary.main">${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth size="large" component={Link} to="/checkout" sx={{ mb: 1.5, py: 1.5 }}>
              Checkout
            </Button>
            <Button variant="outlined" color="inherit" fullWidth startIcon={<RemoveShoppingCartIcon />} onClick={clear} sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.08)" }}>
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
