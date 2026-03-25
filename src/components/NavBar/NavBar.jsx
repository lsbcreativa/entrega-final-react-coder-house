// NavBar — Barra de navegación principal
// Contiene el logo, los links de categorías y el widget del carrito
// En mobile se transforma en un menú lateral (Drawer)
import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Container from "@mui/material/Container"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import PetsIcon from "@mui/icons-material/Pets"
import CartWidget from "../CartWidget/CartWidget"

// Definición de las categorías del navbar — cada una con su ruta
const categories = [
  { label: "Inicio", path: "/", end: true },
  { label: "Alimentos", path: "/category/alimentos" },
  { label: "Juguetes", path: "/category/juguetes" },
  { label: "Accesorios", path: "/category/accesorios" },
  { label: "Higiene", path: "/category/higiene" },
]

const NavBar = () => {
  // Estado para controlar si el menú lateral (mobile) está abierto o cerrado
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  // Cerrar el drawer automáticamente al cambiar de ruta
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  return (
    // AppBar sticky — se mantiene fijo al hacer scroll
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 76, justifyContent: "space-between" }}>
          {/* Logo — al hacer clic lleva al inicio */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", color: "white" }}>
            <PetsIcon sx={{ fontSize: 30, color: "primary.main" }} />
            <Box>
              <Typography sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: "1.15rem", letterSpacing: "1px", color: "#fff" }}>
                HOUSE OF PRINIE
              </Typography>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", fontSize: "0.55rem" }}>
                Boutique Premium para Mascotas
              </Typography>
            </Box>
          </Box>

          {/* Navegación desktop — se oculta en mobile (xs) */}
          {/* NavLink marca automáticamente la clase "active" en la categoría actual */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {categories.map(cat => (
              <Button key={cat.path} component={NavLink} to={cat.path} end={cat.end}
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", px: 2, py: 1, letterSpacing: "0.5px", borderRadius: 2,
                  "&.active": { color: "primary.main", bgcolor: "rgba(198,165,92,0.08)" },
                  "&:hover": { color: "primary.main", bgcolor: "rgba(198,165,92,0.05)" },
                }}>
                {cat.label}
              </Button>
            ))}
          </Box>

          {/* Carrito + botón hamburguesa (solo en mobile) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CartWidget />
            <IconButton sx={{ display: { md: "none" }, color: "primary.main" }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer — menú lateral para dispositivos móviles */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 280, bgcolor: "#111" } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PetsIcon sx={{ color: "primary.main" }} />
            <Typography fontWeight={700} fontSize="0.95rem" letterSpacing={1}>HOUSE OF PRINIE</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(198,165,92,0.1)" }} />
        {/* Lista de categorías en el drawer */}
        <List sx={{ px: 1, pt: 1 }}>
          {categories.map(cat => (
            <ListItem key={cat.path} disablePadding>
              <ListItemButton component={Link} to={cat.path} selected={pathname === cat.path}
                sx={{ borderRadius: 2, mb: 0.25, "&.Mui-selected": { bgcolor: "rgba(198,165,92,0.1)", "& .MuiListItemText-primary": { color: "primary.main" } } }}>
                <ListItemText primary={cat.label} primaryTypographyProps={{ fontWeight: 500, letterSpacing: "0.5px", fontSize: "0.9rem" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default NavBar
