// Item — Card individual de producto
// Muestra la imagen, nombre, precio, categoría y estado de stock
// Al hacer clic en "Ver detalle" navega a la vista detallada del producto
import { Link } from "react-router-dom"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"

// Imagen placeholder — se muestra si el producto no tiene imagen o si la URL falla
const PLACEHOLDER = "https://placehold.co/600x600/1a1a1a/C6A55C?text=Sin+imagen"

const Item = ({ id, name, price, img, stock, category }) => {
  // Handler para errores de carga de imagen — reemplaza con placeholder
  const handleImgError = (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER }

  return (
    // Card con altura 100% para que todas las cards del grid tengan el mismo tamaño
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Contenedor de la imagen con altura fija para uniformidad */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 240, bgcolor: "#111" }}>
        {/* Imagen del producto con efecto zoom al hover */}
        <CardMedia component="img" image={img || PLACEHOLDER} alt={name} onError={handleImgError}
          sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", "&:hover": { transform: "scale(1.05)" } }} />
        {/* Gradiente oscuro en la parte inferior para mejorar legibilidad */}
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", pointerEvents: "none" }} />
        {/* Chip de categoría — badge dorado en la esquina superior izquierda */}
        <Chip label={category.toUpperCase()} size="small"
          sx={{ position: "absolute", top: 14, left: 14, bgcolor: "rgba(198,165,92,0.9)", color: "#0D0D0D", fontWeight: 700, fontSize: "0.6rem", letterSpacing: 1.5, height: 24 }} />
        {/* Renderizado condicional: si quedan 3 o menos unidades, muestra advertencia */}
        {stock <= 3 && stock > 0 && (
          <Chip label={`Quedan ${stock}`} size="small" sx={{ position: "absolute", top: 14, right: 14, bgcolor: "rgba(212,175,55,0.15)", color: "#D4AF37", fontWeight: 700, fontSize: "0.6rem", border: "1px solid rgba(212,175,55,0.3)" }} />
        )}
        {/* Renderizado condicional: si no hay stock, muestra "Agotado" */}
        {stock === 0 && (
          <Chip label="Agotado" size="small" sx={{ position: "absolute", top: 14, right: 14, bgcolor: "rgba(248,113,113,0.15)", color: "#F87171", fontWeight: 700, fontSize: "0.6rem", border: "1px solid rgba(248,113,113,0.3)" }} />
        )}
      </Box>

      {/* Nombre del producto — máximo 2 líneas con ellipsis */}
      <CardContent sx={{ flexGrow: 1, pb: 0.5, pt: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: "rgba(255,255,255,0.7)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5, fontSize: "0.88rem" }}>
          {name}
        </Typography>
        {/* Precio en soles peruanos — formateado con 2 decimales */}
        <Typography sx={{ fontWeight: 800, fontSize: "1.35rem", color: "primary.main", letterSpacing: "0.5px" }}>
          S/ {price.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
        </Typography>
      </CardContent>

      {/* Botón que lleva a la vista de detalle del producto */}
      <CardActions sx={{ px: 2, pb: 2, pt: 1 }}>
        <Button component={Link} to={`/item/${id}`} variant="contained" color="primary" fullWidth>Ver detalle</Button>
      </CardActions>
    </Card>
  )
}

export default Item
