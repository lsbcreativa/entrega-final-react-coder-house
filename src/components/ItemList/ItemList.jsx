// ItemList — Grilla de productos
// Recibe un array de productos y los renderiza en un grid responsive de 4 columnas
import Grid from "@mui/material/Grid"
import Item from "../Item/Item"

const ItemList = ({ products }) => {
  return (
    // Grid responsive: 1 columna en mobile, 2 en tablet, 3 en desktop, 4 en pantallas grandes
    <Grid container spacing={3}>
      {products.map(prod => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
          {/* Cada producto se renderiza como una card individual */}
          <Item {...prod} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemList
