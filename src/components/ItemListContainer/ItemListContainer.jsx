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

const gold = "#C6A55C"

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    const productsRef = collection(db, "products")
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef

    getDocs(q)
      .then(snapshot => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProducts(docs)
      })
      .catch(error => console.error("Error fetching products:", error))
      .finally(() => setLoading(false))
  }, [categoryId])

  const categoryNames = {
    alimentos: "Food",
    juguetes: "Toys",
    accesorios: "Accessories",
    higiene: "Grooming"
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* HERO — only on home */}
      {!categoryId && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #0D0D0D 0%, #1a1712 40%, #1c1610 100%)",
            borderRadius: 4,
            p: { xs: 4, md: 7 },
            mb: 6,
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: "auto", md: 400 },
            display: "flex",
            alignItems: "center",
            border: `1px solid rgba(198,165,92,0.1)`,
          }}
        >
          {/* Decorative gold glow */}
          <Box sx={{ position: "absolute", top: "-20%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, rgba(198,165,92,0.08), transparent 60%)` }} />
          <Box sx={{ position: "absolute", bottom: "-30%", left: "-5%", width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, rgba(198,165,92,0.05), transparent 60%)` }} />

          {/* Gold line accent */}
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${gold}40, transparent)` }} />

          <Box sx={{ position: "relative", zIndex: 2, maxWidth: 600 }}>
            <Typography variant="overline" sx={{ color: gold, fontSize: "0.7rem", mb: 2, display: "block" }}>
              LUXURY PET BOUTIQUE
            </Typography>
            <Typography variant="h2" sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.1, mb: 2, fontSize: { xs: "2rem", md: "3.2rem" }, letterSpacing: "-0.5px" }}>
              Welcome to{" "}
              <Box component="span" sx={{ color: gold }}>
                House of Prinie
              </Box>
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.8, mb: 4, maxWidth: 500 }}>
              Curated premium products for your beloved companion. Because they deserve nothing but the finest.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {[
                { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />, text: "Free Shipping" },
                { icon: <DiamondOutlinedIcon sx={{ fontSize: 16 }} />, text: "Premium Quality" },
                { icon: <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />, text: "Certified Products" },
              ].map((f, i) => (
                <Chip
                  key={i}
                  icon={f.icon}
                  label={f.text}
                  size="small"
                  sx={{
                    bgcolor: "rgba(198,165,92,0.06)",
                    color: "rgba(255,255,255,0.6)",
                    border: `1px solid rgba(198,165,92,0.12)`,
                    "& .MuiChip-icon": { color: gold },
                    fontSize: "0.72rem",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Decorative paw — desktop only */}
          <Box sx={{ display: { xs: "none", lg: "flex" }, position: "absolute", right: 80, alignItems: "center", justifyContent: "center" }}>
            <PetsIcon sx={{ fontSize: 180, color: "rgba(198,165,92,0.04)" }} />
          </Box>
        </Box>
      )}

      {/* Section header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="overline" sx={{ color: gold, fontSize: "0.7rem", display: "block", mb: 1 }}>
          {categoryId ? "COLLECTION" : "OUR PRODUCTS"}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "0.5px" }}>
          {categoryId ? categoryNames[categoryId] || categoryId : "All Products"}
        </Typography>
      </Box>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Inventory2OutlinedIcon sx={{ fontSize: 64, color: "text.secondary", opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No products available in this category.</Typography>
        </Box>
      ) : (
        <ItemList products={products} />
      )}
    </Container>
  )
}

export default ItemListContainer
