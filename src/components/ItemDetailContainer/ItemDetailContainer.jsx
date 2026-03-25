// ItemDetailContainer — Contenedor para la vista de detalle de un producto
// Obtiene un producto individual de Firestore usando el ID de la URL
// Maneja 3 estados: cargando, no encontrado, y producto disponible
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
  // Estado del producto obtenido — null mientras carga o si no existe
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  // Obtenemos el ID del producto desde los parámetros de la URL
  const { itemId } = useParams()

  // Consultamos Firestore para obtener el documento del producto por su ID
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

  // Renderizado condicional: mientras carga, mostramos el spinner
  if (loading) return <Container maxWidth="lg" sx={{ py: 5 }}><Loader /></Container>

  // Renderizado condicional: si el producto no existe, mostramos mensaje de error
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", py: 10 }}>
          <SearchOffIcon sx={{ fontSize: 64, color: "primary.main", opacity: 0.3, mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight={700}>Producto no encontrado</Typography>
          <Typography color="text.secondary">Este producto no existe o fue eliminado.</Typography>
        </Box>
      </Container>
    )
  }

  // Si el producto existe, renderizamos el componente ItemDetail con sus datos
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <ItemDetail {...product} />
    </Container>
  )
}

export default ItemDetailContainer
