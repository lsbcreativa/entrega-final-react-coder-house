import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useCart } from "../../context/CartContext"
import Brief from "../Brief/Brief"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import CelebrationIcon from "@mui/icons-material/Celebration"
import HomeIcon from "@mui/icons-material/Home"

const Checkout = () => {
  const { cart, totalPrice, totalQuantity, clear } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", emailConfirm: "" })
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.email !== formData.emailConfirm) { alert("Los emails no coinciden"); return }
    setLoading(true)
    const order = {
      buyer: { name: formData.name, phone: formData.phone, email: formData.email },
      items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      total: totalPrice, date: new Date()
    }
    try {
      for (const item of cart) {
        const productRef = doc(db, "products", item.id)
        const productSnap = await getDoc(productRef)
        if (productSnap.exists()) await updateDoc(productRef, { stock: productSnap.data().stock - item.quantity })
      }
      const docRef = await addDoc(collection(db, "orders"), order)
      setOrderId(docRef.id); clear()
    } catch (error) { console.error("Error:", error); alert("Error al crear la orden. Intentá nuevamente.") }
    finally { setLoading(false) }
  }

  if (totalQuantity === 0 && !orderId) return <Navigate to="/" />

  if (orderId) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, textAlign: "center", borderRadius: 4, border: "1px solid rgba(198,165,92,0.15)", position: "relative", overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #C6A55C, transparent)" }} />
          <CelebrationIcon sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" fontWeight={800} gutterBottom>¡Gracias por tu compra!</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Tu orden fue registrada exitosamente</Typography>
          <Paper variant="outlined" sx={{ p: 2.5, mb: 2, borderRadius: 3, borderColor: "rgba(198,165,92,0.15)", bgcolor: "rgba(198,165,92,0.03)" }}>
            <Typography variant="caption" color="text.secondary">ID de tu orden:</Typography>
            <Typography variant="body1" fontWeight={700} sx={{ fontFamily: "monospace", letterSpacing: 0.5, wordBreak: "break-all", color: "primary.main" }}>{orderId}</Typography>
          </Paper>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Guardá este ID para hacer seguimiento de tu pedido</Typography>
          <Button variant="contained" color="primary" component={Link} to="/" startIcon={<HomeIcon />} size="large">Volver al inicio</Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.7rem", display: "block", mb: 0.5 }}>CHECKOUT</Typography>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>Completar Pedido</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(198,165,92,0.1)" }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Datos de contacto</Typography>
            <Divider sx={{ mb: 3, borderColor: "rgba(198,165,92,0.08)" }} />
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField label="Nombre completo" name="name" placeholder="Ej: Juan Pérez" value={formData.name} onChange={handleChange} required fullWidth />
              <TextField label="Teléfono" name="phone" type="tel" placeholder="Ej: 987 654 321" value={formData.phone} onChange={handleChange} required fullWidth />
              <TextField label="Email" name="email" type="email" placeholder="tucorreo@email.com" value={formData.email} onChange={handleChange} required fullWidth />
              <TextField label="Confirmar email" name="emailConfirm" type="email" placeholder="Repetí tu email" value={formData.emailConfirm} onChange={handleChange} required fullWidth />
              <Button type="submit" variant="contained" color="primary" size="large" disabled={loading} sx={{ py: 1.5, mt: 1, fontSize: "1rem" }}>
                {loading ? "Procesando..." : "Confirmar compra"}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(198,165,92,0.1)", position: { md: "sticky" }, top: { md: 92 } }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>RESUMEN DEL PEDIDO</Typography>
            <Divider sx={{ my: 1.5, borderColor: "rgba(198,165,92,0.08)" }} />
            <Brief />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
