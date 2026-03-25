// App.jsx — Componente raíz de la aplicación
// Define la estructura general: navbar, rutas (SPA) y footer
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { CartProvider } from "./context/CartContext"

// Importación de los componentes de cada vista/página
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/Checkout"
import NotFound from "./components/NotFound/NotFound"

// Componentes de Material UI para el layout y footer
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import PetsIcon from "@mui/icons-material/Pets"
import PlaceIcon from "@mui/icons-material/Place"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"

// Color dorado principal — constante reutilizable
const gold = "#C6A55C"

// Componente auxiliar: al cambiar de ruta, hace scroll al inicio de la página
// Esto mejora la experiencia al navegar entre secciones
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    // HashRouter porque GitHub Pages no soporta rutas con historyAPI
    <HashRouter>
      {/* CartProvider envuelve toda la app para que el carrito sea accesible globalmente */}
      <CartProvider>
        <ScrollToTop />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Barra de navegación fija en la parte superior */}
          <NavBar />

          {/* Contenido principal — cambia según la ruta actual */}
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              {/* Ruta principal — muestra todos los productos */}
              <Route path="/" element={<ItemListContainer />} />
              {/* Ruta por categoría — filtra productos (alimentos, juguetes, etc.) */}
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              {/* Ruta de detalle — muestra un producto específico por su ID */}
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              {/* Carrito de compras */}
              <Route path="/cart" element={<Cart />} />
              {/* Checkout — formulario para finalizar la compra */}
              <Route path="/checkout" element={<Checkout />} />
              {/* Ruta 404 — cualquier URL que no coincida muestra esta página */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          {/* ==================== FOOTER ==================== */}
          <Box sx={{ bgcolor: "#080808", mt: "auto", position: "relative", overflow: "hidden" }}>
            {/* Línea decorativa dorada en la parte superior del footer */}
            <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: "1px", background: `linear-gradient(90deg, transparent, ${gold}30, transparent)` }} />

            <Container maxWidth="lg">
              {/* Grid de 3 columnas: info de la marca, categorías y contacto */}
              <Grid container spacing={4} sx={{ py: 6 }}>
                {/* Columna 1 — Logo y descripción de la marca */}
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

                {/* Columna 2 — Lista de categorías */}
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

                {/* Columna 3 — Información de contacto */}
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

              {/* Copyright y créditos */}
              <Box sx={{ py: 2.5, textAlign: "center", display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.15)", letterSpacing: 1 }}>
                  © 2026 House of Prinie. Todos los derechos reservados.
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(198,165,92,0.35)", letterSpacing: 0.5 }}>
                  Hecho por{" "}
                  <Box component="a" href="https://andresbotta.dev" target="_blank" rel="noopener noreferrer" sx={{ color: "rgba(198,165,92,0.6)", textDecoration: "none", "&:hover": { color: "primary.main" } }}>
                    AndresBottaDev
                  </Box>
                  {" "}· Entrega final del curso React JS — Coder House
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
