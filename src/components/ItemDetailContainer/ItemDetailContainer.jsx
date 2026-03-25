import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import ItemDetail from "../ItemDetail/ItemDetail"
import Loader from "../Loader/Loader"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SearchOffIcon from "@mui/icons-material/SearchOff"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, "products", itemId)
    getDoc(docRef)
      .then(snapshot => {
        if (snapshot.exists()) setProduct({ id: snapshot.id, ...snapshot.data() })
      })
      .catch(error => console.error("Error fetching product:", error))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) return <Container maxWidth="lg" sx={{ py: 5 }}><Loader /></Container>

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", py: 10 }}>
          <SearchOffIcon sx={{ fontSize: 64, color: "primary.main", opacity: 0.3, mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight={700}>Product not found</Typography>
          <Typography color="text.secondary">This product doesn't exist or has been removed.</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <ItemDetail {...product} />
    </Container>
  )
}

export default ItemDetailContainer
