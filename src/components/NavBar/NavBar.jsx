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

const categories = [
  { label: "Home", path: "/", end: true },
  { label: "Food", path: "/category/alimentos" },
  { label: "Toys", path: "/category/juguetes" },
  { label: "Accessories", path: "/category/accesorios" },
  { label: "Grooming", path: "/category/higiene" },
]

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 76, justifyContent: "space-between" }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", color: "white" }}>
            <PetsIcon sx={{ fontSize: 30, color: "primary.main" }} />
            <Box>
              <Typography sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: "1.15rem", letterSpacing: "1px", color: "#fff" }}>
                HOUSE OF PRINIE
              </Typography>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", fontSize: "0.55rem" }}>
                Luxury Pet Boutique
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {categories.map(cat => (
              <Button
                key={cat.path}
                component={NavLink}
                to={cat.path}
                end={cat.end}
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.82rem",
                  px: 2,
                  py: 1,
                  letterSpacing: "0.5px",
                  borderRadius: 2,
                  "&.active": {
                    color: "primary.main",
                    bgcolor: "rgba(198,165,92,0.08)",
                  },
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "rgba(198,165,92,0.05)",
                  },
                }}
              >
                {cat.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CartWidget />
            <IconButton sx={{ display: { md: "none" }, color: "primary.main" }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 280, bgcolor: "#111" } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PetsIcon sx={{ color: "primary.main" }} />
            <Typography fontWeight={700} fontSize="0.95rem" letterSpacing={1}>HOUSE OF PRINIE</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(198,165,92,0.1)" }} />
        <List sx={{ px: 1, pt: 1 }}>
          {categories.map(cat => (
            <ListItem key={cat.path} disablePadding>
              <ListItemButton
                component={Link}
                to={cat.path}
                selected={pathname === cat.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.25,
                  "&.Mui-selected": {
                    bgcolor: "rgba(198,165,92,0.1)",
                    "& .MuiListItemText-primary": { color: "primary.main" },
                  },
                }}
              >
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
