import { HashRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { CartProvider } from "./context/CartContext"
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/Checkout"
import NotFound from "./components/NotFound/NotFound"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import PetsIcon from "@mui/icons-material/Pets"
import PlaceIcon from "@mui/icons-material/Place"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"

const gold = "#C6A55C"

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <ScrollToTop />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <NavBar />
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          {/* LUXURY FOOTER */}
          <Box sx={{ bgcolor: "#080808", mt: "auto", position: "relative", overflow: "hidden" }}>
            {/* Gold line accent */}
            <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: "1px", background: `linear-gradient(90deg, transparent, ${gold}30, transparent)` }} />

            <Container maxWidth="lg">
              <Grid container spacing={4} sx={{ py: 6 }}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <PetsIcon sx={{ color: gold, fontSize: 28 }} />
                    <Box>
                      <Typography sx={{ color: "#fff", fontWeight: 800, letterSpacing: 1.5, fontSize: "1rem" }}>
                        HOUSE OF PRINIE
                      </Typography>
                      <Typography variant="caption" sx={{ color: gold, letterSpacing: 2, fontSize: "0.55rem", fontWeight: 600 }}>
                        BOUTIQUE PREMIUM PARA MASCOTAS
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", lineHeight: 1.8, maxWidth: 340 }}>
                    Productos premium seleccionados para tu compañero. Porque se merece lo mejor.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="overline" sx={{ color: gold, fontWeight: 700, letterSpacing: 3, fontSize: "0.6rem" }}>
                    Categorías
                  </Typography>
                  {["Alimentos", "Juguetes", "Accesorios", "Higiene"].map(cat => (
                    <Typography key={cat} variant="body2" sx={{ color: "rgba(255,255,255,0.3)", mt: 1, fontSize: "0.85rem", cursor: "default", transition: "0.3s", "&:hover": { color: gold } }}>
                      {cat}
                    </Typography>
                  ))}
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="overline" sx={{ color: gold, fontWeight: 700, letterSpacing: 3, fontSize: "0.6rem" }}>
                    Contacto
                  </Typography>
                  {[
                    { icon: <PlaceIcon sx={{ fontSize: 14 }} />, text: "Lima, Perú" },
                    { icon: <PhoneIcon sx={{ fontSize: 14 }} />, text: "+51 987 654 321" },
                    { icon: <EmailIcon sx={{ fontSize: 14 }} />, text: "hola@houseofprinie.com" },
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <Box sx={{ color: "rgba(198,165,92,0.4)" }}>{item.icon}</Box>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>{item.text}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.03)" }} />
              <Box sx={{ py: 2.5, textAlign: "center" }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.15)", letterSpacing: 1 }}>
                  © 2026 House of Prinie. Todos los derechos reservados.
                </Typography>
              </Box>
            </Container>
          </Box>
        </Box>
      </CartProvider>
    </HashRouter>
  )
}

export default App
