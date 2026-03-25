import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import ItemList from "../ItemList/ItemList"
import Loader from "../Loader/Loader"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import PetsIcon from "@mui/icons-material/Pets"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { keyframes } from "@mui/system"

const gold = "#C6A55C"

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-10px, -40px) scale(0.95); }
  75% { transform: translate(20px, -10px) scale(1.02); }
`
const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-25px, 15px) scale(1.08); }
  66% { transform: translate(15px, -25px) scale(0.96); }
`
const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(-20px, -30px) scale(1.1); opacity: 1; }
`
const pulse = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.08); }
`
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const orbStyle = (size, top, right, animation, duration, color = gold, blur = 40) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  background: `radial-gradient(circle at 30% 30%, ${color}, rgba(198,165,92,0.1))`,
  filter: `blur(${blur}px)`,
  top,
  right,
  animation: `${animation} ${duration}s ease-in-out infinite`,
  pointerEvents: "none",
})

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    const productsRef = collection(db, "products")
    const q = categoryId ? query(productsRef, where("category", "==", categoryId)) : productsRef
    getDocs(q)
      .then(snapshot => { setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))) })
      .catch(error => console.error("Error:", error))
      .finally(() => setLoading(false))
  }, [categoryId])

  const categoryNames = { alimentos: "Alimentos", juguetes: "Juguetes", accesorios: "Accesorios", higiene: "Higiene" }
  const categoryDescriptions = {
    alimentos: "Nutrición premium para perros y gatos. Alimentos balanceados, snacks y dietas especiales para cada etapa de vida.",
    juguetes: "Diversión garantizada para tu mascota. Juguetes interactivos, peluches y accesorios de entretenimiento.",
    accesorios: "Comodidad y estilo para tu compañero. Camas, collares, transportadoras y todo lo que necesita.",
    higiene: "Cuidado profesional en casa. Shampoos, cepillos, cortaúñas y productos de limpieza para tu mascota.",
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {!categoryId && (
        <Box sx={{ background: "linear-gradient(135deg, #0D0D0D 0%, #1a1712 40%, #1c1610 100%)", borderRadius: 4, p: { xs: 4, md: 7 }, mb: 6, position: "relative", overflow: "hidden", minHeight: { xs: "auto", md: 400 }, display: "flex", alignItems: "center", border: "1px solid rgba(198,165,92,0.1)" }}>

          {/* Animated golden orbs — CSS only */}
          <Box sx={orbStyle(180, "10%", "15%", float1, 8, "rgba(212,175,55,0.4)", 50)} />
          <Box sx={orbStyle(120, "50%", "25%", float2, 10, "rgba(198,165,92,0.3)", 40)} />
          <Box sx={orbStyle(80, "20%", "40%", float3, 7, "rgba(168,137,61,0.35)", 30)} />
          <Box sx={orbStyle(200, "30%", "5%", pulse, 6, "rgba(198,165,92,0.12)", 60)} />

          {/* Rotating ring */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)",
            width: 220, height: 220, borderRadius: "50%",
            border: "1px solid rgba(198,165,92,0.15)",
            animation: `${rotate} 20s linear infinite`,
            pointerEvents: "none",
            "&::before": {
              content: '""', position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
              width: 8, height: 8, borderRadius: "50%", bgcolor: gold,
              boxShadow: `0 0 15px ${gold}, 0 0 30px rgba(198,165,92,0.5)`,
            },
            "&::after": {
              content: '""', position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
              width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(198,165,92,0.6)",
              boxShadow: `0 0 10px rgba(198,165,92,0.4)`,
            },
          }} />

          {/* Second ring */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
            width: 300, height: 300, borderRadius: "50%",
            border: "1px dashed rgba(198,165,92,0.08)",
            animation: `${rotate} 35s linear infinite reverse`,
            pointerEvents: "none",
            "&::before": {
              content: '""', position: "absolute", top: -3, right: "20%",
              width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(198,165,92,0.4)",
              boxShadow: `0 0 10px rgba(198,165,92,0.3)`,
            },
          }} />

          {/* Gold line top */}
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${gold}40, transparent)` }} />

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 2, maxWidth: 600 }}>
            <Typography variant="overline" sx={{ color: gold, fontSize: "0.7rem", mb: 2, display: "block" }}>BOUTIQUE PREMIUM PARA MASCOTAS</Typography>
            <Typography variant="h2" sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.1, mb: 2, fontSize: { xs: "2rem", md: "3.2rem" }, letterSpacing: "-0.5px" }}>
              Bienvenido a{" "}<Box component="span" sx={{ color: gold }}>House of Prinie</Box>
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.8, mb: 4, maxWidth: 500 }}>
              Descubre nuestra colección exclusiva de productos premium para tu mascota. Alimentos de primera calidad, juguetes innovadores, accesorios de diseño y productos de higiene profesional. Porque tu compañero merece lo mejor.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {[
                { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />, text: "Envío gratis" },
                { icon: <DiamondOutlinedIcon sx={{ fontSize: 16 }} />, text: "Calidad premium" },
                { icon: <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />, text: "Productos certificados" },
              ].map((f, i) => (
                <Chip key={i} icon={f.icon} label={f.text} size="small"
                  sx={{ bgcolor: "rgba(198,165,92,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(198,165,92,0.12)", "& .MuiChip-icon": { color: gold }, fontSize: "0.72rem" }} />
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="overline" sx={{ color: gold, fontSize: "0.7rem", display: "block", mb: 1 }}>
          {categoryId ? "COLECCIÓN" : "NUESTROS PRODUCTOS"}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "0.5px" }}>
          {categoryId ? categoryNames[categoryId] || categoryId : "Todos los Productos"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 600, mx: "auto" }}>
          {categoryId
            ? categoryDescriptions[categoryId] || `Explora nuestra selección de ${categoryNames[categoryId]?.toLowerCase()}`
            : "Explora nuestro catálogo completo de productos seleccionados para el bienestar de tu mascota."
          }
        </Typography>
      </Box>

      {loading ? <Loader /> : products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Inventory2OutlinedIcon sx={{ fontSize: 64, color: "text.secondary", opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No hay productos disponibles en esta categoría.</Typography>
        </Box>
      ) : <ItemList products={products} />}
    </Container>
  )
}

export default ItemListContainer
